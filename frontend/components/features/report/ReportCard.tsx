import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'reviewing' | 'resolved';
  location: string;
  date: string;
}

export function ReportCard({ id, title, description, status, location, date }: ReportCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{location}</CardDescription>
          </div>
          <Badge variant={status === 'resolved' ? 'default' : 'secondary'}>
            {status === 'pending' ? 'Chờ xử lý' : status === 'reviewing' ? 'Đang xem xét' : 'Đã giải quyết'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-2">{date}</p>
      </CardContent>
    </Card>
  );
}
