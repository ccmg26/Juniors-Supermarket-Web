"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("route_render_failed", { digest: error.digest, message: error.message });
  }, [error]);

  return (
    <div className="container-max px-4 py-20 text-center">
      <h1 className="text-3xl font-black text-fg">We couldn&apos;t load this page</h1>
      <p className="mx-auto mt-3 max-w-lg text-muted-fg">
        The problem may be temporary. Check your connection and try again.
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-6">
        Try again
      </button>
    </div>
  );
}
