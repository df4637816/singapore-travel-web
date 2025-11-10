import { Navbar } from '@/components/layout/Navbar';
import { GoogleMap } from '@/components/map/Map';
import { BackToTop } from '@/components/layout/BackToTop';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">新加坡美食推薦地圖</h1>

        <div className="rounded-lg shadow-lg overflow-hidden">
          <GoogleMap />
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
