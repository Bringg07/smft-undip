import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

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
    <div className="min-h-screen bg-perlemen-950">
      <AdminNav email={session.user?.email ?? null} />
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-8">{children}</main>
    </div>
  );
}
