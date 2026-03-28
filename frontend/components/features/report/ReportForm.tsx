'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ReportForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tạo báo cáo mới</CardTitle>
        <CardDescription>Mô tả chi tiết vi phạm vệ sinh hoặc môi trường</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input type="text" placeholder="Tiêu đề báo cáo" />
          <Textarea placeholder="Mô tả chi tiết vi phạm" />
          <Input type="file" accept="image/*" />
          <Button className="w-full">Gửi báo cáo</Button>
        </form>
      </CardContent>
    </Card>
  );
}
