import Banner from "@/components/banner.client";
import Link from "next/link";

export default function Home() {
  const coffeeStoreId = "cafe-condor";
  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-14"> */}
        <Banner />
        <Link href={`/coffee-store/${coffeeStoreId}`}>Café Condor</Link>
      </main>
    </div>
  );
}
