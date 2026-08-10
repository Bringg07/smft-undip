import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import { ToastProvider } from "@/components/admin/Toast";
import SessionTimeout from "@/components/admin/SessionTimeout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Lapisan keamanan kedua (selain middleware)
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-parlemen-950">
      <AdminNav email={session.user?.email ?? null} />
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-8">
        <ToastProvider>{children}</ToastProvider>
      </main>
      {/* Logout otomatis bila admin tidak aktif terlalu lama */}
      <SessionTimeout />
    </div>
  );
}
