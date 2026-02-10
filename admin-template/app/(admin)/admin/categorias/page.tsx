import { Suspense } from 'react';
import { CategoriesScreen } from '@/components/admin/categories/categories-screen';

export const metadata = { title: 'Gestão de Categorias' };

export default function Page() {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">Carregando...</div>}>
      <CategoriesScreen />
    </Suspense>
  );
}
