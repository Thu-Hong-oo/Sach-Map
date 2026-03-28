import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface UserCardProps {
  name: string;
  role: string;
  reports: number;
}

export function UserCard({ name, role, reports }: UserCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Avatar />
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
            <p className="text-xs text-gray-500">{reports} báo cáo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
