'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng ký</CardTitle>
        <CardDescription>Tạo tài khoản để bắt đầu báo cáo vi phạm</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input type="text" placeholder="Tên đầy đủ" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Mật khẩu" />
          <Input type="password" placeholder="Xác nhận mật khẩu" />
          <Button className="w-full">Đăng ký</Button>
        </form>
      </CardContent>
    </Card>
  );
}
