import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-secondary">The page you are looking for doesn’t exist.</p>
      <Link className="mt-6 text-primary" href="/">
        Back to home
      </Link>
    </div>
  );
}
