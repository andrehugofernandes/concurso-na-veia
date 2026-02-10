import { Suspense } from "react";
import { UsersScreen } from "@/components/admin/users/users-screen";

export const metadata = {
  title: "Gestão de Usuários",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">Carregando...</div>}>
      <UsersScreen />
    </Suspense>
  );
}
