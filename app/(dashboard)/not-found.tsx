import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-4">
      <Link
        className="absolute top-4 left-4"
        href="/"
      >
        <button>Back Home</button>
      </Link>
    </div>
  );
}
