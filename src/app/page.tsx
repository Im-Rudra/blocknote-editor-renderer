import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex m-20 gap-6">
      <Link
        href="/blocknote-editor"
        className="px-1 bg-gray-500 hover:bg-gray-100/60 hover:shadow rounded transition-all"
      >
        Blocknote Editor
      </Link>
      <Link
        href="/renderer"
        className="px-1 bg-gray-500 hover:bg-gray-100/60 hover:shadow rounded transition-all"
      >
        Renderer
      </Link>
    </div>
  );
}
