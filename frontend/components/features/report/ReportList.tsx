'use client';

import { ReportCard } from './ReportCard';

const mockReports = [
  {
    id: '1',
    title: 'Nước thải bất hợp pháp',
    description: 'Phát hiện nước thải chảy ra từ nhà máy.',
    status: 'pending' as const,
    location: 'Quận 1, TP.HCM',
    date: '2 giờ trước',
  },
  {
    id: '2',
    title: 'Rác thải nguy hiểm',
    description: 'Tìm thấy rác thải công nghiệp ở bãi rác.',
    status: 'reviewing' as const,
    location: 'Quận 12, TP.HCM',
    date: '5 giờ trước',
  },
];

export function ReportList() {
  return (
    <div className="space-y-4">
      {mockReports.map((report) => (
        <ReportCard key={report.id} {...report} />
      ))}
    </div>
  );
}
