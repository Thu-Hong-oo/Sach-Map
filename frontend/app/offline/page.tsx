import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[#f5faeb] px-4 py-10 text-[#2e4113]">
      <div className="mx-auto max-w-sm rounded-2xl border border-[#d7e5bc] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6b8e23]">SACH MAP</p>
        <h1 className="mt-2 text-xl font-bold">Ban dang offline</h1>
        <p className="mt-2 text-sm text-[#5a6d3a]">
          Khong the tai du lieu moi luc nay. Hay kiem tra ket noi va thu lai. Cac trang da cache van co the mo tren dien thoai.
        </p>

        <div className="mt-5 space-y-2 text-sm">
          <Link
            href="/report"
            className="block rounded-lg bg-[#6b8e23] px-3 py-2 text-center font-medium text-white transition hover:bg-[#5c7a1d]"
          >
            Mo Bao Cao Nhanh
          </Link>
          <Link
            href="/map"
            className="block rounded-lg border border-[#d7e5bc] px-3 py-2 text-center font-medium text-[#3c5220] transition hover:bg-[#f2f8e6]"
          >
            Mo Ban Do
          </Link>
        </div>
      </div>
    </main>
  );
}
