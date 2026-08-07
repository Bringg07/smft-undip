"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email atau password salah. Coba lagi.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-parlemen-950 px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold-300"
        >
          <ArrowLeft size={16} />
          Kembali ke website
        </Link>

        <div className="glass rounded-[1.75rem] p-8 md:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
              <Lock size={24} className="text-gold-300" />
            </div>
            <h1 className="font-heading text-2xl text-white">Login Admin</h1>
            <p className="mt-2 font-body text-sm text-white/50">
              Panel pengelolaan SMFT UNDIP
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@smftundip.com"
                className="w-full rounded-lg border border-gold-400/20 bg-parlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gold-400/20 bg-parlemen-900 p-3 text-white outline-none transition-colors focus:border-gold-400"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm text-rose-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-400 py-3 font-bold text-parlemen-950 transition-all hover:bg-gold-300 disabled:opacity-50"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
