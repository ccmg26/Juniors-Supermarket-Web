import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-white font-black text-3xl">J</span>
          </div>
          <h1 className="text-white font-black text-2xl">Admin Login</h1>
          <p className="text-bg/80 text-sm mt-1">Junior&apos;s Supermarket</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
