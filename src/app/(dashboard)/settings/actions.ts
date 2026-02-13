'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';
import { isAdmin, getCurrentUser } from '@/lib/auth/get-current-user';
import { logAction, logError } from '@/lib/services/audit-logger';
import { LogAction, LogResource } from '@/lib/types/audit-log';

// ============================================================================
// Types
// ============================================================================

export interface SiteSettingsData {
  id: string;
  siteTitle: string;
  dashboardTitle: string | null;
  siteDescription: string | null;
  siteUrl: string | null;
  adminEmail: string | null;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  language: string;
  loginParticlesStyle: 'claude' | 'manus';
  defaultTheme: string;
  primaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  firebaseProjectId: string | null;
  firebaseStorageBucket: string | null;
  smtpHost: string | null;
  smtpPort: number | null;
  smtpUser: string | null;
  smtpFromEmail: string | null;
  smtpFromName: string | null;
  s3Bucket: string | null;
  s3Region: string | null;
  s3AccessKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Schemas
// ============================================================================

const siteSettingsSchema = z.object({
  siteTitle: z.string().min(1, 'Título do site é obrigatório').max(255),
  dashboardTitle: z.string().max(255).optional().nullable().or(z.literal('')),
  siteDescription: z.string().max(1000).optional().nullable(),
  siteUrl: z.string().url('URL inválida').optional().nullable().or(z.literal('')),
  adminEmail: z.string().email('Email inválido').optional().nullable().or(z.literal('')),
  timezone: z.string().min(1).max(100),
  dateFormat: z.string().min(1).max(50),
  timeFormat: z.string().min(1).max(50),
  language: z.string().min(2).max(10),
  loginParticlesStyle: z.enum(['claude', 'manus']),
  logoUrl: z.string().url('URL do logo inválida').optional().nullable().or(z.literal('')),
  faviconUrl: z.string().url('URL do favicon inválida').optional().nullable().or(z.literal('')),
});

const themeSettingsSchema = z.object({
  defaultTheme: z.enum(['light', 'dark', 'system']),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor primária inválida'),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor de destaque inválida'),
});

const integrationSettingsSchema = z.object({
  firebaseProjectId: z.string().max(255).optional().nullable().or(z.literal('')),
  firebaseStorageBucket: z.string().max(255).optional().nullable().or(z.literal('')),
  smtpHost: z.string().max(255).optional().nullable().or(z.literal('')),
  smtpPort: z.number().int().min(1).max(65535).optional().nullable(),
  smtpUser: z.string().max(255).optional().nullable().or(z.literal('')),
  smtpPassword: z.string().max(255).optional().nullable().or(z.literal('')),
  smtpFromEmail: z.string().email('Email de envio inválido').optional().nullable().or(z.literal('')),
  smtpFromName: z.string().max(255).optional().nullable().or(z.literal('')),
  s3Bucket: z.string().max(255).optional().nullable().or(z.literal('')),
  s3Region: z.string().max(100).optional().nullable().or(z.literal('')),
  s3AccessKey: z.string().max(255).optional().nullable().or(z.literal('')),
  s3SecretKey: z.string().max(255).optional().nullable().or(z.literal('')),
});

// ============================================================================
// Helper Functions
// ============================================================================

const SETTINGS_ID = 'default';

type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
};

function getRequestMetaFromHeaders(allHeaders: Headers): RequestMeta {
  const rawIp = allHeaders.get('x-forwarded-for') || allHeaders.get('x-real-ip') || undefined;
  const ipAddress = rawIp ? rawIp.split(',')[0]?.trim() : undefined;
  const userAgent = allHeaders.get('user-agent') || undefined;

  return {
    ipAddress,
    userAgent,
  };
}

function sanitizeSettingsAuditDetails(input: Record<string, unknown>): Record<string, unknown> {
  const cloned = { ...input };
  if ('smtpPassword' in cloned) {
    delete cloned.smtpPassword;
  }
  if ('s3SecretKey' in cloned) {
    delete cloned.s3SecretKey;
  }

  return cloned;
}

function diffChangedFields(
  previous: Record<string, unknown> | null,
  next: Record<string, unknown> | null,
): string[] {
  if (!previous || !next) return [];

  const keys = new Set([...Object.keys(previous), ...Object.keys(next)]);
  const changed: string[] = [];
  for (const key of keys) {
    if (previous[key] !== next[key]) {
      changed.push(key);
    }
  }
  return changed;
}

/**
 * Obtém ou cria as configurações do site (singleton)
 */
async function getOrCreateSettings() {
  let settings = await prisma.siteSettings.findUnique({
    where: { id: SETTINGS_ID },
  });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: SETTINGS_ID },
    });
  }

  return settings;
}

/**
 * Mascara campos sensíveis para exibição
 */
function maskSensitiveFields(settings: SiteSettingsData): SiteSettingsData {
  return {
    ...settings,
    // Não retornamos senhas - apenas indicamos se estão configuradas
  };
}

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Obtém as configurações do site
 */
export async function getSettings(): Promise<ActionResponse<{ settings: SiteSettingsData }>> {
  try {
    // Verificar permissão - apenas admin pode ver configurações
    if (!(await isAdmin())) {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logAction(
        LogResource.SETTINGS,
        LogAction.UNAUTHORIZED_ACCESS,
        currentUser?.id,
        {
          operation: 'getSettings',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Você não tem permissão para acessar as configurações');
    }

    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());

    const settings = await getOrCreateSettings();

    // Remover campos sensíveis da resposta
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { smtpPassword, s3SecretKey, ...safeSettings } = settings;

    await logAction(
      LogResource.SETTINGS,
      LogAction.READ,
      currentUser?.id,
      {
        operation: 'getSettings',
        settingsId: SETTINGS_ID,
      },
      meta.ipAddress,
      meta.userAgent,
    );

    return createSuccessResponse({
      settings: maskSensitiveFields(safeSettings as SiteSettingsData),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getSettings] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logError(
        LogResource.SETTINGS,
        LogAction.EXCEPTION,
        error instanceof Error ? error : String(error),
        currentUser?.id,
        {
          operation: 'getSettings',
        },
        meta.ipAddress,
        meta.userAgent,
      );
    } catch {
    }

    return createErrorResponse('Erro ao buscar configurações');
  }
}

/**
 * Obtém o título global do dashboard (para exibição no header) para qualquer usuário autenticado.
 */
export async function getDashboardTitleForHeader(): Promise<
  ActionResponse<{ dashboardTitle: string | null }>
> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return createErrorResponse('Não autenticado');
    }

    const settings = await getOrCreateSettings();
    return createSuccessResponse({
      dashboardTitle: settings.dashboardTitle || null,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getDashboardTitleForHeader] Error:', error);
    return createErrorResponse('Erro ao buscar título do dashboard');
  }
}

/**
 * Atualiza as configurações do site
 */
export async function updateSiteSettings(
  input: z.infer<typeof siteSettingsSchema>
): Promise<ActionResponse<{ settings: SiteSettingsData }>> {
  try {
    // Verificar permissão - apenas admin pode atualizar configurações
    if (!(await isAdmin())) {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logAction(
        LogResource.SETTINGS,
        LogAction.UNAUTHORIZED_ACCESS,
        currentUser?.id,
        {
          operation: 'updateSiteSettings',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Você não tem permissão para atualizar as configurações');
    }

    const validated = siteSettingsSchema.parse(input);

    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());

    const previous = await prisma.siteSettings.findUnique({
      where: { id: SETTINGS_ID },
    });

    // Garantir que o registro existe
    await getOrCreateSettings();

    const settings = await prisma.siteSettings.update({
      where: { id: SETTINGS_ID },
      data: {
        siteTitle: validated.siteTitle,
        dashboardTitle: validated.dashboardTitle || null,
        siteDescription: validated.siteDescription || null,
        siteUrl: validated.siteUrl || null,
        adminEmail: validated.adminEmail || null,
        timezone: validated.timezone,
        dateFormat: validated.dateFormat,
        timeFormat: validated.timeFormat,
        language: validated.language,
        loginParticlesStyle: validated.loginParticlesStyle,
        logoUrl: validated.logoUrl || null,
        faviconUrl: validated.faviconUrl || null,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { smtpPassword, s3SecretKey, ...safeSettings } = settings;

    const changedFields = diffChangedFields(
      previous ? sanitizeSettingsAuditDetails(previous as unknown as Record<string, unknown>) : null,
      sanitizeSettingsAuditDetails(settings as unknown as Record<string, unknown>),
    );

    await logAction(
      LogResource.SETTINGS,
      LogAction.UPDATE,
      currentUser?.id,
      {
        operation: 'updateSiteSettings',
        settingsId: SETTINGS_ID,
        changedFields,
        input: sanitizeSettingsAuditDetails(validated as unknown as Record<string, unknown>),
      },
      meta.ipAddress,
      meta.userAgent,
    );

    return createSuccessResponse({
      settings: maskSensitiveFields(safeSettings as SiteSettingsData),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateSiteSettings] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());

      if (error instanceof z.ZodError) {
        await logAction(
          LogResource.SETTINGS,
          LogAction.INVALID_INPUT,
          currentUser?.id,
          {
            operation: 'updateSiteSettings',
            message: error.errors[0]?.message,
          },
          meta.ipAddress,
          meta.userAgent,
        );
      } else {
        await logError(
          LogResource.SETTINGS,
          LogAction.EXCEPTION,
          error instanceof Error ? error : String(error),
          currentUser?.id,
          {
            operation: 'updateSiteSettings',
          },
          meta.ipAddress,
          meta.userAgent,
        );
      }
    } catch {
    }

    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar configurações do site');
  }
}

/**
 * Atualiza as configurações de tema
 */
export async function updateThemeSettings(
  input: z.infer<typeof themeSettingsSchema>
): Promise<ActionResponse<{ settings: SiteSettingsData }>> {
  try {
    // Verificar permissão - apenas admin pode atualizar configurações
    if (!(await isAdmin())) {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logAction(
        LogResource.SETTINGS,
        LogAction.UNAUTHORIZED_ACCESS,
        currentUser?.id,
        {
          operation: 'updateThemeSettings',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Você não tem permissão para atualizar as configurações');
    }

    const validated = themeSettingsSchema.parse(input);

    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());

    const previous = await prisma.siteSettings.findUnique({
      where: { id: SETTINGS_ID },
    });

    // Garantir que o registro existe
    await getOrCreateSettings();

    const settings = await prisma.siteSettings.update({
      where: { id: SETTINGS_ID },
      data: {
        defaultTheme: validated.defaultTheme,
        primaryColor: validated.primaryColor,
        accentColor: validated.accentColor,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { smtpPassword, s3SecretKey, ...safeSettings } = settings;

    const changedFields = diffChangedFields(
      previous ? sanitizeSettingsAuditDetails(previous as unknown as Record<string, unknown>) : null,
      sanitizeSettingsAuditDetails(settings as unknown as Record<string, unknown>),
    );

    await logAction(
      LogResource.SETTINGS,
      LogAction.UPDATE,
      currentUser?.id,
      {
        operation: 'updateThemeSettings',
        settingsId: SETTINGS_ID,
        changedFields,
        input: sanitizeSettingsAuditDetails(validated as unknown as Record<string, unknown>),
      },
      meta.ipAddress,
      meta.userAgent,
    );

    return createSuccessResponse({
      settings: maskSensitiveFields(safeSettings as SiteSettingsData),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateThemeSettings] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());

      if (error instanceof z.ZodError) {
        await logAction(
          LogResource.SETTINGS,
          LogAction.INVALID_INPUT,
          currentUser?.id,
          {
            operation: 'updateThemeSettings',
            message: error.errors[0]?.message,
          },
          meta.ipAddress,
          meta.userAgent,
        );
      } else {
        await logError(
          LogResource.SETTINGS,
          LogAction.EXCEPTION,
          error instanceof Error ? error : String(error),
          currentUser?.id,
          {
            operation: 'updateThemeSettings',
          },
          meta.ipAddress,
          meta.userAgent,
        );
      }
    } catch {
    }

    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar configurações de tema');
  }
}

/**
 * Atualiza as configurações de integrações
 */
export async function updateIntegrationSettings(
  input: z.infer<typeof integrationSettingsSchema>
): Promise<ActionResponse<{ settings: SiteSettingsData }>> {
  try {
    // Verificar permissão - apenas admin pode atualizar configurações
    if (!(await isAdmin())) {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logAction(
        LogResource.SETTINGS,
        LogAction.UNAUTHORIZED_ACCESS,
        currentUser?.id,
        {
          operation: 'updateIntegrationSettings',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Você não tem permissão para atualizar as configurações');
    }

    const validated = integrationSettingsSchema.parse(input);

    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());

    const previous = await prisma.siteSettings.findUnique({
      where: { id: SETTINGS_ID },
    });

    // Garantir que o registro existe
    await getOrCreateSettings();

    // Preparar dados para atualização
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {
      firebaseProjectId: validated.firebaseProjectId || null,
      firebaseStorageBucket: validated.firebaseStorageBucket || null,
      smtpHost: validated.smtpHost || null,
      smtpPort: validated.smtpPort || null,
      smtpUser: validated.smtpUser || null,
      smtpFromEmail: validated.smtpFromEmail || null,
      smtpFromName: validated.smtpFromName || null,
      s3Bucket: validated.s3Bucket || null,
      s3Region: validated.s3Region || null,
      s3AccessKey: validated.s3AccessKey || null,
    };

    // Só atualizar senhas se foram fornecidas (não vazias)
    if (validated.smtpPassword && validated.smtpPassword.trim() !== '') {
      // TODO: Implementar criptografia AES-256 para senhas
      updateData.smtpPassword = validated.smtpPassword;
    }

    if (validated.s3SecretKey && validated.s3SecretKey.trim() !== '') {
      // TODO: Implementar criptografia AES-256 para senhas
      updateData.s3SecretKey = validated.s3SecretKey;
    }

    const settings = await prisma.siteSettings.update({
      where: { id: SETTINGS_ID },
      data: updateData,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { smtpPassword, s3SecretKey, ...safeSettings } = settings;

    const changedFields = diffChangedFields(
      previous ? sanitizeSettingsAuditDetails(previous as unknown as Record<string, unknown>) : null,
      sanitizeSettingsAuditDetails(settings as unknown as Record<string, unknown>),
    );

    await logAction(
      LogResource.SETTINGS,
      LogAction.UPDATE,
      currentUser?.id,
      {
        operation: 'updateIntegrationSettings',
        settingsId: SETTINGS_ID,
        changedFields,
        input: {
          ...sanitizeSettingsAuditDetails(validated as unknown as Record<string, unknown>),
          hasSmtpPassword: Boolean(validated.smtpPassword && validated.smtpPassword.trim() !== ''),
          hasS3SecretKey: Boolean(validated.s3SecretKey && validated.s3SecretKey.trim() !== ''),
        },
      },
      meta.ipAddress,
      meta.userAgent,
    );

    return createSuccessResponse({
      settings: maskSensitiveFields(safeSettings as SiteSettingsData),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateIntegrationSettings] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());

      if (error instanceof z.ZodError) {
        await logAction(
          LogResource.SETTINGS,
          LogAction.INVALID_INPUT,
          currentUser?.id,
          {
            operation: 'updateIntegrationSettings',
            message: error.errors[0]?.message,
          },
          meta.ipAddress,
          meta.userAgent,
        );
      } else {
        await logError(
          LogResource.SETTINGS,
          LogAction.EXCEPTION,
          error instanceof Error ? error : String(error),
          currentUser?.id,
          {
            operation: 'updateIntegrationSettings',
          },
          meta.ipAddress,
          meta.userAgent,
        );
      }
    } catch {
    }

    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar configurações de integrações');
  }
}

/**
 * Testa a conexão SMTP
 */
export async function testSmtpConnection(): Promise<ActionResponse<{ success: boolean; message: string }>> {
  try {
    // Verificar permissão - apenas admin pode testar conexões
    if (!(await isAdmin())) {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logAction(
        LogResource.SETTINGS,
        LogAction.UNAUTHORIZED_ACCESS,
        currentUser?.id,
        {
          operation: 'testSmtpConnection',
          provider: 'smtp',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Você não tem permissão para testar conexões');
    }

    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());

    const settings = await getOrCreateSettings();

    if (!settings.smtpHost || !settings.smtpPort) {
      await logAction(
        LogResource.SETTINGS,
        LogAction.INVALID_INPUT,
        currentUser?.id,
        {
          operation: 'testSmtpConnection',
          provider: 'smtp',
          reason: 'missing_smtp_config',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Configurações SMTP não definidas');
    }

    await logAction(
      LogResource.SETTINGS,
      LogAction.READ,
      currentUser?.id,
      {
        operation: 'testSmtpConnection',
        provider: 'smtp',
      },
      meta.ipAddress,
      meta.userAgent,
    );

    // TODO: Implementar teste real de conexão SMTP
    // Por enquanto, apenas validamos que as configurações existem
    return createSuccessResponse({
      success: true,
      message: 'Configurações SMTP parecem válidas. Teste de envio não implementado.',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[testSmtpConnection] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logError(
        LogResource.SETTINGS,
        LogAction.EXCEPTION,
        error instanceof Error ? error : String(error),
        currentUser?.id,
        {
          operation: 'testSmtpConnection',
          provider: 'smtp',
        },
        meta.ipAddress,
        meta.userAgent,
      );
    } catch {
    }

    return createErrorResponse('Erro ao testar conexão SMTP');
  }
}

/**
 * Testa a conexão S3
 */
export async function testS3Connection(): Promise<ActionResponse<{ success: boolean; message: string }>> {
  try {
    // Verificar permissão - apenas admin pode testar conexões
    if (!(await isAdmin())) {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logAction(
        LogResource.SETTINGS,
        LogAction.UNAUTHORIZED_ACCESS,
        currentUser?.id,
        {
          operation: 'testS3Connection',
          provider: 's3',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Você não tem permissão para testar conexões');
    }

    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());

    const settings = await getOrCreateSettings();

    if (!settings.s3Bucket || !settings.s3Region || !settings.s3AccessKey) {
      await logAction(
        LogResource.SETTINGS,
        LogAction.INVALID_INPUT,
        currentUser?.id,
        {
          operation: 'testS3Connection',
          provider: 's3',
          reason: 'missing_s3_config',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Configurações S3 não definidas');
    }

    await logAction(
      LogResource.SETTINGS,
      LogAction.READ,
      currentUser?.id,
      {
        operation: 'testS3Connection',
        provider: 's3',
      },
      meta.ipAddress,
      meta.userAgent,
    );

    // TODO: Implementar teste real de conexão S3
    // Por enquanto, apenas validamos que as configurações existem
    return createSuccessResponse({
      success: true,
      message: 'Configurações S3 parecem válidas. Teste de conexão não implementado.',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[testS3Connection] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());
      await logError(
        LogResource.SETTINGS,
        LogAction.EXCEPTION,
        error instanceof Error ? error : String(error),
        currentUser?.id,
        {
          operation: 'testS3Connection',
          provider: 's3',
        },
        meta.ipAddress,
        meta.userAgent,
      );
    } catch {
    }

    return createErrorResponse('Erro ao testar conexão S3');
  }
}
