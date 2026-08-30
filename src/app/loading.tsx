export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="container-max px-4 py-20 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
      <p className="mt-4 text-sm text-muted-fg">Loading current store information…</p>
    </div>
  );
}
