import Link from "next/link";
import { Flame } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-orange-500 shadow-2xl mb-6">
        <Flame className="size-10 text-white" />
      </div>
      <h1 className="text-5xl font-extrabold text-neutral-900 mb-3">FIRE Restaurant</h1>
      <p className="text-xl text-neutral-600 mb-8 max-w-md">
        Complete Restaurant Management System — POS, Inventory, Reports & More.
      </p>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-orange-600 transition"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
