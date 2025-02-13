import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="col-span-2">
          <h1>Not Found</h1>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
