import { redirect } from 'next/navigation';

export const metadata = { title: 'Categorias' };

export default function Page() {
  redirect('/admin/categorias');
}
