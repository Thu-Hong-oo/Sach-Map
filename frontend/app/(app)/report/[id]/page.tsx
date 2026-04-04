export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Chi tiết báo cáo</h1>
      <p className="text-muted-foreground">ID: {id}</p>
    </div>
  );
}
