'use client';

export default function ReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Chi tiết báo cáo</h1>
      <p className="text-muted-foreground">ID: {params.id}</p>
    </div>
  );
}
