import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getAuthUserFromRequest } from '@/lib/auth'

const updateSchema = z.object({
  forceTwoFactor: z.boolean(),
  passwordPolicy: z.enum(['basic', 'strong', 'ad']),
  sessionTimeoutMin: z.number().int().min(5).max(240),
})

async function requireAdmin(request: NextRequest) {
  const authUser = await getAuthUserFromRequest(request)
  if (!authUser) {
    return { error: NextResponse.json({ error: 'Não autenticado' }, { status: 401 }) }
  }

  const role = authUser.role?.toUpperCase() ?? ''
  if (role !== 'ADMIN' && role !== 'SYSADMIN') {
    return { error: NextResponse.json({ error: 'Acesso negado' }, { status: 403 }) }
  }

  return { authUser }
}

async function getOrCreatePolicy() {
  const existing = await prisma.securityPolicy.findFirst({
    orderBy: { id: 'asc' },
  })
  if (existing) {
    return existing
  }
  return prisma.securityPolicy.create({
    data: {},
  })
}

export async function GET(request: NextRequest) {
  const check = await requireAdmin(request)
  if ('error' in check) {
    return check.error
  }

  try {
    const policy = await getOrCreatePolicy()
    return NextResponse.json({
      forceTwoFactor: policy.forceTwoFactor,
      passwordPolicy: policy.passwordPolicy,
      sessionTimeoutMin: policy.sessionTimeoutMin,
      updatedAt: policy.updatedAt,
      updatedById: policy.updatedById,
    })
  } catch (error) {
    console.error('[GET /api/security/settings] Erro ao carregar política:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const check = await requireAdmin(request)
  if ('error' in check) {
    return check.error
  }

  const body = await request.json().catch(() => null)
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  try {
    const policy = await getOrCreatePolicy()
    const updated = await prisma.securityPolicy.update({
      where: { id: policy.id },
      data: {
        forceTwoFactor: parsed.data.forceTwoFactor,
        passwordPolicy: parsed.data.passwordPolicy,
        sessionTimeoutMin: parsed.data.sessionTimeoutMin,
        updatedById: check.authUser.id,
      },
    })

    return NextResponse.json({
      forceTwoFactor: updated.forceTwoFactor,
      passwordPolicy: updated.passwordPolicy,
      sessionTimeoutMin: updated.sessionTimeoutMin,
      updatedAt: updated.updatedAt,
      updatedById: updated.updatedById,
    })
  } catch (error) {
    console.error('[PUT /api/security/settings] Erro ao atualizar política:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
