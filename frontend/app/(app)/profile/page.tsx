'use client';

import { CheckCircle2, MapPin, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocaleContext } from '@/lib/context/LocaleContext';

export default function ProfilePage() {
  const { messages } = useLocaleContext();

  const userData = {
    name: 'Nguyễn Văn Tuấn',
    badge: 'Đại sứ xanh (Hạng Vàng)',
    reports: 12,
    resolved: 8,
    points: 850,
  };

  const activityItems = [
    {
      id: 1,
      status: 'resolved',
      icon: CheckCircle2,
      title: 'Báo cáo đã được xử lý',
      location: 'Công viên Lê Văn Tám',
    },
    {
      id: 2,
      status: 'pending',
      icon: MapPin,
      title: 'Báo cáo mới đang xử lý',
      location: 'Ngõ 12, Quận 1',
    },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2f4312]">{messages.pages.profile.title}</h1>
        <button className="p-2 rounded-full bg-[#f0f7e6] text-[#6b8e23] hover:bg-[#e6f2d6] transition">
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* User Card */}
      <div className="rounded-3xl bg-linear-to-br from-[#e6f5d6] via-white to-[#f0f7e6] p-6 shadow-sm border border-[#d8e4c2]">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="h-32 w-32 rounded-full bg-white border-4 border-[#6b8e23] flex items-center justify-center shadow-md mb-4">
            <div className="h-20 w-20 rounded-full bg-linear-to-br from-[#6b8e23] to-[#5a7620] flex items-center justify-center text-white text-4xl font-bold">
              {userData.name.charAt(0)}
            </div>
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold text-[#2f4312]">{userData.name}</h2>

          {/* Badge */}
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#d4e3bb] px-3 py-1">
            <span className="text-[#6b8e23]">🍃</span>
            <span className="text-sm font-medium text-[#3c5220]">{userData.badge}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white border border-[#d8e4c2] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#6b8e23]">{userData.reports}</p>
          <p className="text-xs text-[#5a6d3a] font-medium">Đã báo cáo</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#d8e4c2] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#0ea5e9]">{userData.resolved}</p>
          <p className="text-xs text-[#5a6d3a] font-medium">Được xử lý</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#d8e4c2] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#f59e0b]">{userData.points}</p>
          <p className="text-xs text-[#5a6d3a] font-medium">Điểm thưởng</p>
        </div>
      </div>

      {/* Activity Section */}
      <div>
        <h3 className="text-lg font-bold text-[#2f4312] mb-3">Hoạt động gần đây</h3>

        <div className="space-y-2">
          {activityItems.map((item) => {
            const IconComponent = item.icon;
            const isResolved = item.status === 'resolved';

            return (
              <button
                key={item.id}
                className="w-full rounded-2xl bg-white border border-[#d8e4c2] p-4 text-left shadow-sm hover:bg-[#f9fbf5] transition flex items-center justify-between"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${
                      isResolved ? 'bg-[#d1f5dd]' : 'bg-[#fff3cd]'
                    }`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${
                        isResolved ? 'text-[#2ea95c]' : 'text-[#f59e0b]'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2f4312]">{item.title}</p>
                    <p className="mt-0.5 text-xs text-[#5a6d3a] flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </p>
                  </div>
                </div>
                <div className="text-[#6b8e23]">→</div>
              </button>
            );
          })}
        </div>

        <Button className="w-full mt-4 h-10 bg-white border border-[#6b8e23] text-[#6b8e23] hover:bg-[#f0f7e6] font-medium">
          Xem tất cả lịch sử
        </Button>
      </div>
    </div>
  );
}
