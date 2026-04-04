'use client';

import { ChangeEvent, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, CheckCircle2, LocateFixed, MapPin, ShieldAlert, Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLocaleContext } from '@/lib/context/LocaleContext';

type ViolationCategory = 'illegal_dumping' | 'wastewater' | 'burning' | 'toxic_odor' | 'noise' | 'other';

const MAP_BOUND = {
  latMin: 10.7,
  latMax: 10.86,
  lngMin: 106.58,
  lngMax: 106.78,
};

const categoryMeta: Array<{ key: ViolationCategory; icon: string }> = [
  { key: 'illegal_dumping', icon: '🗑️' },
  { key: 'wastewater', icon: '💧' },
  { key: 'burning', icon: '🔥' },
  { key: 'toxic_odor', icon: '🌫️' },
  { key: 'noise', icon: '🔊' },
  { key: 'other', icon: '📌' },
];

function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num));
}

function generateTrackingId() {
  const stamp = new Date().toISOString().slice(2, 10).replaceAll('-', '');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SM-${stamp}-${random}`;
}

function buildAiSuggestion(fileName: string, locale: 'vi' | 'en') {
  const lower = fileName.toLowerCase();
  const isBurning = lower.includes('burn') || lower.includes('smoke') || lower.includes('khoi');
  const isWaste = lower.includes('rac') || lower.includes('trash') || lower.includes('waste');
  const isWater = lower.includes('water') || lower.includes('nuoc') || lower.includes('drain');

  if (locale === 'en') {
    if (isBurning) {
      return {
        title: 'Suspicious open-air waste burning',
        description:
          'Possible open-air burning of waste near a residential area. Smoke density appears high and may impact public health.',
      };
    }
    if (isWater) {
      return {
        title: 'Possible illegal wastewater discharge',
        description:
          'Image indicates discolored liquid discharge from a drainage point. Recommend urgent field verification and sample testing.',
      };
    }
    if (isWaste) {
      return {
        title: 'Illegal dumping at public space',
        description:
          'Large volume of unmanaged waste is visible in a public area, with risk of odor, pests, and secondary pollution.',
      };
    }
    return {
      title: 'Potential environmental hygiene violation',
      description:
        'AI detected signs of sanitation non-compliance. Please verify details and submit to trigger Green Agent analysis workflow.',
    };
  }

  if (isBurning) {
    return {
      title: 'Nghi vấn đốt rác lộ thiên',
      description:
        'Ảnh cho thấy khả năng có hoạt động đốt rác ngoài trời gần khu dân cư. Mật độ khói cao, có nguy cơ ảnh hưởng sức khỏe cộng đồng.',
    };
  }
  if (isWater) {
    return {
      title: 'Nghi vấn xả nước thải trái phép',
      description:
        'Hình ảnh có dấu hiệu dòng thải bất thường từ miệng cống/kênh. Đề xuất kiểm tra hiện trường và lấy mẫu sớm.',
    };
  }
  if (isWaste) {
    return {
      title: 'Đổ rác không đúng nơi quy định',
      description:
        'Phát hiện lượng rác tập kết tự phát tại khu vực công cộng, có nguy cơ gây mùi, phát sinh côn trùng và ô nhiễm thứ cấp.',
    };
  }
  return {
    title: 'Nghi vấn vi phạm vệ sinh môi trường',
    description:
      'AI phát hiện dấu hiệu mất vệ sinh môi trường từ hình ảnh. Vui lòng xác nhận thông tin để gửi Green Agent phân tích và xử lý.',
  };
}

export default function ReportPage() {
  const { messages, locale } = useLocaleContext();
  const mapRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [location, setLocation] = useState({ lat: 10.7769, lng: 106.7009 });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ViolationCategory>('illegal_dumping');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const stepLabels = messages.pages.reportQuickFlow.steps;

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const onLocateMe = () => {
    if (!navigator.geolocation) return;
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: Number(pos.coords.latitude.toFixed(6)),
          lng: Number(pos.coords.longitude.toFixed(6)),
        });
        setDetectingLocation(false);
      },
      () => setDetectingLocation(false),
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  const onPickMiniMap = (clientX: number, clientY: number) => {
    const node = mapRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const xRatio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const yRatio = clamp((clientY - rect.top) / rect.height, 0, 1);
    const lat = Number((MAP_BOUND.latMax - yRatio * (MAP_BOUND.latMax - MAP_BOUND.latMin)).toFixed(6));
    const lng = Number((MAP_BOUND.lngMin + xRatio * (MAP_BOUND.lngMax - MAP_BOUND.lngMin)).toFixed(6));
    setLocation({ lat, lng });
  };

  const markerPos = useMemo(() => {
    const x = ((location.lng - MAP_BOUND.lngMin) / (MAP_BOUND.lngMax - MAP_BOUND.lngMin)) * 100;
    const y = ((MAP_BOUND.latMax - location.lat) / (MAP_BOUND.latMax - MAP_BOUND.latMin)) * 100;
    return { x: clamp(x, 0, 100), y: clamp(y, 0, 100) };
  }, [location]);

  const canGoStep2 = Boolean(photoPreview);
  const canGoStep3 = canGoStep2;
  const canGoStep4 = title.trim().length > 4 && description.trim().length > 10;

  const onConfirmSubmit = () => {
    setTrackingId(generateTrackingId());
    setIsSubmitted(true);
  };

  const onGoStep3 = () => {
    if (fileName && (!title || !description)) {
      const suggestion = buildAiSuggestion(fileName, locale);
      setTitle((prev) => prev || suggestion.title);
      setDescription((prev) => prev || suggestion.description);
    }
    setStep(3);
  };

  return (
    <div className="space-y-4 pb-8">
      <div className="rounded-2xl border border-[#dce7cb] bg-linear-to-br from-[#f6faef] via-white to-[#edf6df] p-4">
        <h1 className="text-lg font-semibold text-[#2f4312]">{messages.pages.reportQuickFlow.title}</h1>
        <p className="mt-1 text-xs text-[#5a6d3a]">{messages.pages.reportQuickFlow.description}</p>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[stepLabels.step1, stepLabels.step2, stepLabels.step3, stepLabels.step4].map((label, index) => {
            const active = index + 1 === step;
            const done = index + 1 < step;
            return (
              <div key={label} className="space-y-1 text-center">
                <div
                  className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold ${
                    active || done ? 'bg-[#6b8e23] text-white' : 'bg-[#ebf2dd] text-[#5a6d3a]'
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </div>
                <p className={`text-[10px] ${active ? 'text-[#2f4312]' : 'text-[#7a8a63]'}`}>{label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {step === 1 && (
        <Card className="rounded-2xl border-[#d8e4c2] bg-white/95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2f4312]">
              <Camera className="h-4 w-4" />
              {stepLabels.step1}
            </CardTitle>
            <CardDescription>{messages.pages.reportQuickFlow.step1Hint}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#b7cb8d] bg-[#f7fbef] px-3 py-4 text-xs font-medium text-[#445d1a] transition hover:bg-[#edf6df]">
              <Upload className="h-4 w-4" />
              {messages.pages.reportQuickFlow.uploadButton}
              <Input className="hidden" type="file" accept="image/*" capture="environment" onChange={onFileChange} />
            </label>

            {photoPreview && (
              <div className="relative h-56 overflow-hidden rounded-xl border border-[#d8e4c2]">
                <Image src={photoPreview} alt="report preview" fill className="object-cover" unoptimized />
              </div>
            )}

            <Button
              className="h-9 w-full bg-[#6b8e23] text-white hover:bg-[#5b7a1d]"
              disabled={!canGoStep2}
              onClick={() => setStep(2)}
            >
              {messages.pages.reportQuickFlow.next}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="rounded-2xl border-[#d8e4c2] bg-white/95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2f4312]">
              <MapPin className="h-4 w-4" />
              {stepLabels.step2}
            </CardTitle>
            <CardDescription>{messages.pages.reportQuickFlow.step2Hint}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              size="sm"
              className="h-8 w-full bg-[#6b8e23] text-white hover:bg-[#5b7a1d]"
              onClick={onLocateMe}
            >
              <LocateFixed className="h-4 w-4" />
              {detectingLocation ? messages.pages.reportQuickFlow.detectingLocation : messages.pages.reportQuickFlow.autoLocate}
            </Button>

            <div
              ref={mapRef}
              role="button"
              tabIndex={0}
              onClick={(e) => onPickMiniMap(e.clientX, e.clientY)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const rect = mapRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  onPickMiniMap(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
              }}
              className="relative h-44 overflow-hidden rounded-xl border border-[#d8e4c2] bg-[radial-gradient(circle_at_20%_10%,#d9efb5_0,#b8d98d_45%,#9ec272_100%)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.25)_10%,transparent_40%,rgba(255,255,255,0.18)_70%)]" />
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(35,56,13,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(35,56,13,0.18)_1px,transparent_1px)] bg-size-[34px_34px]" />
              <div
                className="absolute z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#6b8e23] shadow-[0_0_0_4px_rgba(107,142,35,0.25)]"
                style={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
              />
            </div>

            <div className="rounded-lg bg-[#f6faef] p-3 text-xs text-[#40561b]">
              <p>
                Lat: <span className="font-semibold">{location.lat}</span> | Lng:{' '}
                <span className="font-semibold">{location.lng}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-9" onClick={() => setStep(1)}>
                {messages.pages.reportQuickFlow.back}
              </Button>
              <Button className="h-9 bg-[#6b8e23] text-white hover:bg-[#5b7a1d]" disabled={!canGoStep3} onClick={onGoStep3}>
                {messages.pages.reportQuickFlow.next}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="rounded-2xl border-[#d8e4c2] bg-white/95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2f4312]">
              <Sparkles className="h-4 w-4" />
              {stepLabels.step3}
            </CardTitle>
            <CardDescription>{messages.pages.reportQuickFlow.step3Hint}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={messages.pages.reportQuickFlow.titlePlaceholder} />
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={messages.pages.reportQuickFlow.descriptionPlaceholder} />
            <div className="rounded-lg border border-[#d8e4c2] bg-[#f8fbed] p-2 text-[11px] text-[#4b6022]">
              <p className="font-medium">{messages.pages.reportQuickFlow.aiGeneratedNotice}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-9" onClick={() => setStep(2)}>
                {messages.pages.reportQuickFlow.back}
              </Button>
              <Button className="h-9 bg-[#6b8e23] text-white hover:bg-[#5b7a1d]" disabled={!canGoStep4} onClick={() => setStep(4)}>
                {messages.pages.reportQuickFlow.next}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card className="rounded-2xl border-[#d8e4c2] bg-white/95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2f4312]">
              <ShieldAlert className="h-4 w-4" />
              {stepLabels.step4}
            </CardTitle>
            <CardDescription>{messages.pages.reportQuickFlow.step4Hint}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {!isSubmitted && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {categoryMeta.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setCategory(item.key)}
                      className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                        item.key === category
                          ? 'border-[#6b8e23] bg-[#eff7df] text-[#35510d]'
                          : 'border-[#d6e4bf] bg-white text-[#566b30] hover:bg-[#f5faeb]'
                      }`}
                    >
                      <p className="font-medium">
                        <span className="mr-1">{item.icon}</span>
                        {messages.pages.reportQuickFlow.categories[item.key]}
                      </p>
                    </button>
                  ))}
                </div>

                <Button className="h-9 w-full bg-[#6b8e23] text-white hover:bg-[#5b7a1d]" onClick={onConfirmSubmit}>
                  {messages.pages.reportQuickFlow.confirmSubmit}
                </Button>
              </>
            )}

            {isSubmitted && (
              <div className="space-y-3 rounded-xl border border-[#cfe0b0] bg-linear-to-br from-[#f5fbe8] to-white p-4">
                <p className="text-xs text-[#4f6428]">{messages.pages.reportQuickFlow.success}</p>
                <p className="text-sm font-semibold text-[#2f4312]">
                  {messages.pages.reportQuickFlow.trackingId}: {trackingId}
                </p>
                <div className="rounded-lg bg-[#e9f5d2] px-3 py-2 text-xs font-semibold text-[#35510d]">
                  Green Agent đang phân tích & xử lý
                </div>
              </div>
            )}

            <Button variant="outline" className="h-9 w-full" onClick={() => setStep(3)}>
              {messages.pages.reportQuickFlow.back}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
