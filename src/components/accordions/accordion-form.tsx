'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuLoader, LuPlus, LuTrash2, LuChevronUp, LuChevronDown, LuImage, LuFile, LuText } from 'react-icons/lu';
import { availableThemes } from '@/lib/themes';

import { cn } from '@/lib/utils';
import { createAccordionBlock, updateAccordionBlock } from '@/app/admin/accordions/actions';
import { AccordionMediaSheet, type AccordionMediaMode, type AccordionMediaAssetDraft } from '@/components/accordions/accordion-media-sheet';
import { AnimatedInput, AnimatedTextarea } from '@/components/ui/animated-input';

const assetSchema = z.object({
  mediaId: z.number().int().positive(),
  order: z.number().int().min(0),
  caption: z.string().optional().nullable(),
  displayLabel: z.string().optional().nullable(),
});

const VALID_COLOR_KEYS = ['orange', 'blue', 'green', 'lightGreen', 'yellow', 'lightBlue'] as const;
type ColorKey = (typeof VALID_COLOR_KEYS)[number];

const itemSchema = z
  .object({
    title: z.string().min(1, 'Título do item é obrigatório'),
    type: z.enum(['text', 'files', 'images']),
    order: z.number().int().min(0),
    colorKey: z.enum(VALID_COLOR_KEYS).optional().nullable(),
    textContent: z.string().optional().nullable(),
    assets: z.array(assetSchema).default([]),
  })
  .superRefine((value, ctx) => {
    if (value.type === 'text') {
      const text = (value.textContent ?? '').trim();
      if (!text) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['textContent'], message: 'Texto é obrigatório' });
      }
      if (value.assets.length > 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['assets'], message: 'Item de texto não pode ter mídias' });
      }
      return;
    }

    if (value.assets.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['assets'], message: 'Selecione ao menos 1 mídia' });
    }

    if (value.textContent && value.textContent.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['textContent'], message: 'Remova o texto para itens de mídia' });
    }
  });

const formSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255),
  slug: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  accordionType: z.enum(['text', 'files', 'images']).default('text'),
  items: z.array(itemSchema).min(1, 'Adicione ao menos 1 item'),
});

type FormValues = z.infer<typeof formSchema>;

type AccordionDetails = {
  id: string;
  title: string;
  slug: string | null;
  isActive: boolean;
  items: Array<{
    id: string;
    title: string;
    type: 'text' | 'files' | 'images';
    order: number;
    colorKey: string | null;
    textContent: string | null;
    assets: Array<{
      id: string;
      order: number;
      caption: string | null;
      displayLabel: string | null;
      media: { id: number; originalFilename: string };
    }>;
  }>;
};

interface AccordionFormProps {
  accordion?: unknown;
  accordionId?: string;
  onSuccess?: () => void;
}

function moveArrayItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [removed] = next.splice(from, 1);
  next.splice(to, 0, removed);
  return next;
}

export function AccordionForm({ accordion, accordionId, onSuccess }: AccordionFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parsedAccordion = accordion as AccordionDetails | null;

  const defaultValues = useMemo<FormValues>(() => {
    if (!parsedAccordion) {
      return {
        title: '',
        slug: null,
        isActive: true,
        accordionType: 'text' as const,
        items: [
          {
            title: 'Item 1',
            type: 'text' as const,
            order: 0,
            colorKey: null,
            textContent: '',
            assets: [],
          },
        ],
      };
    }

    const firstItemType = parsedAccordion.items[0]?.type ?? 'text';

    return {
      title: parsedAccordion.title,
      slug: parsedAccordion.slug,
      isActive: parsedAccordion.isActive,
      accordionType: firstItemType,
      items: parsedAccordion.items
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item, index) => ({
          title: item.title,
          type: firstItemType,
          order: index,
          colorKey: (item.colorKey as ColorKey) ?? null,
          textContent: item.textContent,
          assets: item.assets
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((asset, assetIndex) => ({
              mediaId: asset.media.id,
              order: assetIndex,
              caption: asset.caption,
              displayLabel: asset.displayLabel ?? asset.media.originalFilename,
            })),
        })),
    };
  }, [parsedAccordion]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');

  const reorderItems = useCallback(
    (from: number, to: number) => {
      const nextItems = moveArrayItem(watchedItems, from, to).map((item, index) => ({
        ...item,
        order: index,
      }));

      setValue('items', nextItems, { shouldValidate: true });
    },
    [setValue, watchedItems]
  );

  const [isMediaSheetOpen, setIsMediaSheetOpen] = useState(false);
  const [mediaSheetMode, setMediaSheetMode] = useState<AccordionMediaMode>('files');
  const [mediaSheetItemIndex, setMediaSheetItemIndex] = useState<number | null>(null);
  const [globalColorKey, setGlobalColorKey] = useState<ColorKey | null>(null);

  const watchedAccordionType = watch('accordionType');

  const handleAccordionTypeChange = useCallback(
    (newType: 'text' | 'files' | 'images') => {
      setValue('accordionType', newType, { shouldValidate: true });

      const updatedItems = watchedItems.map((item) => ({
        ...item,
        type: newType,
        textContent: newType === 'text' ? (item.textContent ?? '') : null,
        assets: newType === 'text' ? [] : item.assets,
      }));

      setValue('items', updatedItems, { shouldValidate: true });
    },
    [setValue, watchedItems]
  );

  const handleOpenMediaSheet = useCallback(
    (index: number, mode: AccordionMediaMode) => {
      setMediaSheetItemIndex(index);
      setMediaSheetMode(mode);
      setIsMediaSheetOpen(true);
    },
    []
  );

  const handleConfirmMediaSheet = useCallback(
    (assets: AccordionMediaAssetDraft[]) => {
      if (mediaSheetItemIndex === null) {
        return;
      }

      const current = watchedItems[mediaSheetItemIndex];

      const nextItem = {
        ...current,
        assets: assets.map((asset, index) => ({
          mediaId: asset.mediaId,
          order: index,
          caption: asset.caption,
          displayLabel: asset.displayLabel,
        })),
        textContent: null,
      };

      update(mediaSheetItemIndex, nextItem);
    },
    [mediaSheetItemIndex, update, watchedItems]
  );

  const handleResetForm = useCallback(() => {
    setServerError(null);
    setIsMediaSheetOpen(false);
    setMediaSheetItemIndex(null);
    setMediaSheetMode('files');
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onFormSubmit = async (raw: FormValues) => {
    const data = formSchema.parse(raw);

    setIsLoading(true);
    setServerError(null);

    try {
      if (accordionId) {
        const result = await updateAccordionBlock({
          id: accordionId,
          title: data.title,
          slug: data.slug ?? null,
          isActive: data.isActive,
          items: data.items.map((item, index) => ({
            title: item.title,
            type: item.type,
            order: index,
            colorKey: item.colorKey ?? null,
            textContent: item.type === 'text' ? (item.textContent ?? null) : null,
            assets:
              item.type === 'text'
                ? []
                : item.assets.map((asset, assetIndex) => ({
                    mediaId: asset.mediaId,
                    order: assetIndex,
                    caption: asset.caption ?? null,
                    displayLabel: asset.displayLabel ?? null,
                  })),
          })),
        });

        if (result.status === 'error') {
          setServerError(result.error || 'Erro ao atualizar acordeon');
          return;
        }

        onSuccess?.();
        return;
      }

      const result = await createAccordionBlock({
        title: data.title,
        slug: data.slug ?? null,
        isActive: data.isActive,
        items: data.items.map((item, index) => ({
          title: item.title,
          type: item.type,
          order: index,
          colorKey: item.colorKey ?? null,
          textContent: item.type === 'text' ? (item.textContent ?? null) : null,
          assets:
            item.type === 'text'
              ? []
              : item.assets.map((asset, assetIndex) => ({
                  mediaId: asset.mediaId,
                  order: assetIndex,
                  caption: asset.caption ?? null,
                  displayLabel: asset.displayLabel ?? null,
                })),
        })),
      });

      if (result.status === 'error') {
        setServerError(result.error || 'Erro ao criar acordeon');
        return;
      }

      onSuccess?.();
    } finally {
      setIsLoading(false);
    }
  };

  const accordionTypeTabs: Array<{ id: 'text' | 'files' | 'images'; label: string; icon: React.ReactNode }> = [
    { id: 'text', label: 'Texto', icon: <LuText className="h-4 w-4" /> },
    { id: 'files', label: 'Arquivos', icon: <LuFile className="h-4 w-4" /> },
    { id: 'images', label: 'Imagens', icon: <LuImage className="h-4 w-4" /> },
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="h-full flex flex-col">
      {serverError && (
        <div role="alert" className="rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-700 dark:text-red-400 mb-4">
          {serverError}
        </div>
      )}

      <div className="flex-1 overflow-y-auto pr-2 pl-2 space-y-6">
        {/* Título do acordeon + Abas de Tipo na mesma linha */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-5 pt-4">
          <div className="flex-1">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <AnimatedInput
                  {...field}
                  label="Título do acordeon *"
                  error={errors.title?.message}
                />
              )}
            />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-md border border-gray-300 dark:border-slate-600 p-1 flex items-center gap-1 h-[50px]">
            {accordionTypeTabs.map((tab) => {
              const isActive = tab.id === watchedAccordionType;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleAccordionTypeChange(tab.id)}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 px-4 h-full rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Itens</h3>
            <div className="flex items-center gap-3">
              {/* Seletor de cor global */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-slate-400">Cor:</span>
                <div className="flex items-center gap-1">
                  {VALID_COLOR_KEYS.map((key) => {
                    const theme = availableThemes[key];
                    const isSelected = globalColorKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setGlobalColorKey(isSelected ? null : key)}
                        title={theme.name}
                        aria-label={theme.name}
                        className={cn(
                          'w-5 h-5 rounded-full border-2 transition-all',
                          isSelected
                            ? 'border-gray-900 dark:border-white ring-2 ring-offset-1 ring-gray-400'
                            : 'border-transparent hover:scale-110'
                        )}
                        style={{ backgroundColor: theme.primary }}
                      />
                    );
                  })}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  append({
                    title: `Item ${fields.length + 1}`,
                    type: watchedAccordionType,
                    order: fields.length,
                    colorKey: globalColorKey,
                    textContent: watchedAccordionType === 'text' ? '' : null,
                    assets: [],
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90"
              >
                <LuPlus className="h-4 w-4" aria-hidden="true" />
                Adicionar item
              </button>
            </div>
          </div>

          {errors.items && typeof errors.items.message === 'string' && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.items.message}</p>
          )}

          <div className="space-y-3">
            {fields.map((field, index) => {
              const itemErrors = errors.items?.[index];
              const itemValue = watchedItems[index];

              return (
                <div
                  key={field.id}
                  className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 space-y-4"
                >
                  {/* Linha do título + botões */}
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <Controller
                        name={`items.${index}.title`}
                        control={control}
                        render={({ field: titleField }) => (
                          <AnimatedInput
                            {...titleField}
                            label={`Título do item ${index + 1} *`}
                            error={itemErrors?.title?.message}
                          />
                        )}
                      />
                    </div>

                    {/* Indicador de cor do item */}
                    {itemValue.colorKey && (
                      <div
                        className="w-6 h-6 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: availableThemes[itemValue.colorKey]?.primary }}
                        title={`Cor: ${availableThemes[itemValue.colorKey]?.name}`}
                      />
                    )}

                    {/* Botões de reordenar/remover */}
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        type="button"
                        onClick={() => reorderItems(index, Math.max(0, index - 1))}
                        disabled={index === 0}
                        className="p-2 rounded-md border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Mover item para cima"
                      >
                        <LuChevronUp className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => reorderItems(index, Math.min(fields.length - 1, index + 1))}
                        disabled={index === fields.length - 1}
                        className="p-2 rounded-md border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Mover item para baixo"
                      >
                        <LuChevronDown className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 rounded-md border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        aria-label="Remover item"
                      >
                        <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {watchedAccordionType === 'text' ? (
                    <Controller
                      name={`items.${index}.textContent`}
                      control={control}
                      render={({ field: textField }) => (
                        <AnimatedTextarea
                          {...textField}
                          value={textField.value ?? ''}
                          label="Conteúdo do item *"
                          rows={4}
                          error={itemErrors?.textContent ? String(itemErrors.textContent.message) : undefined}
                        />
                      )}
                    />
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-slate-200 font-medium">
                          Mídias selecionadas ({itemValue.assets.length})
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenMediaSheet(index, watchedAccordionType === 'images' ? 'images' : 'files')
                          }
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-700 text-sm hover:bg-gray-50 dark:hover:bg-slate-800"
                        >
                          {watchedAccordionType === 'images' ? (
                            <LuImage className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <LuFile className="h-4 w-4" aria-hidden="true" />
                          )}
                          {watchedAccordionType === 'images' ? 'Adicionar Imagens' : 'Adicionar Arquivos'}
                        </button>
                      </div>

                      {itemErrors?.assets && (
                        <p className="text-sm text-red-600 dark:text-red-400">{String(itemErrors.assets.message)}</p>
                      )}

                      {itemValue.assets.length > 0 && (
                        <div className="space-y-3">
                          {itemValue.assets
                            .slice()
                            .sort((a, b) => a.order - b.order)
                            .map((asset, assetIndex) => (
                              <div
                                key={`${asset.mediaId}-${assetIndex}`}
                                className="rounded-md border border-gray-200 dark:border-slate-700 p-3 grid grid-cols-1 md:grid-cols-3 gap-3"
                              >
                                <div className="md:col-span-1">
                                  <div className="text-xs text-gray-500 dark:text-slate-400">Media ID</div>
                                  <div className="font-medium text-gray-900 dark:text-slate-100">{asset.mediaId}</div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-xs text-gray-500 dark:text-slate-400">Label (botão)</label>
                                  <input
                                    type="text"
                                    value={asset.displayLabel ?? ''}
                                    onChange={(e) => {
                                      const nextAssets = itemValue.assets.map((a, idx) =>
                                        idx === assetIndex ? { ...a, displayLabel: e.target.value } : a
                                      );
                                      update(index, { ...itemValue, assets: nextAssets });
                                    }}
                                    placeholder="Ex.: Baixar arquivo"
                                    aria-label={`Label do botão (mídia ${asset.mediaId})`}
                                    className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-xs text-gray-500 dark:text-slate-400">Caption (opcional)</label>
                                  <input
                                    type="text"
                                    value={asset.caption ?? ''}
                                    onChange={(e) => {
                                      const nextAssets = itemValue.assets.map((a, idx) =>
                                        idx === assetIndex ? { ...a, caption: e.target.value } : a
                                      );
                                      update(index, { ...itemValue, assets: nextAssets });
                                    }}
                                    placeholder="Legenda (opcional)"
                                    aria-label={`Caption (mídia ${asset.mediaId})`}
                                    className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={handleResetForm}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 font-medium hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          Limpar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 disabled:opacity-50"
        >
          {isLoading && <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {accordionId ? 'Salvar' : 'Criar'}
        </button>
      </div>

      {mediaSheetItemIndex !== null && (
        <AccordionMediaSheet
          isOpen={isMediaSheetOpen}
          onClose={() => setIsMediaSheetOpen(false)}
          mode={mediaSheetMode}
          initialAssets={(watchedItems[mediaSheetItemIndex]?.assets ?? []).map((asset) => ({
            mediaId: asset.mediaId,
            displayLabel: asset.displayLabel ?? null,
            caption: asset.caption ?? null,
          }))}
          onConfirm={handleConfirmMediaSheet}
        />
      )}
    </form>
  );
}
