'use client';

import { LuLayers } from 'react-icons/lu';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ModalHeader } from '@/components/ui/modal-header';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { useConfetti } from '@/lib/hooks/useConfetti';
import { AccordionForm } from './accordion-form';

interface AccordionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: unknown;
  initialId?: string | null;
}

export function AccordionFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  initialId,
}: AccordionFormModalProps) {
  const isEditing = !!initialId;
  const title = isEditing ? 'Editar Acordeon' : 'Novo Acordeon';
  const description = isEditing
    ? 'Atualize as informações do acordeon'
    : 'Crie um novo acordeon reutilizável';

  const triggerConfetti = useConfetti();

  const handleSuccess = () => {
    triggerConfetti();
    onSuccess();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-5xl h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
        <AnimatedBorder className="rounded-xl" />
        <ModalHeader
          icon={<LuLayers size={24} />}
          title={title}
          description={description}
          onClose={onClose}
        />

        <div className="flex-1 overflow-hidden px-6 py-6 flex flex-col">
          <AccordionForm
            accordion={initialData}
            accordionId={initialId ?? undefined}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
