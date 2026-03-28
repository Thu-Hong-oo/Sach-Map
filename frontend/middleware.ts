import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Bỏ qua các đường dẫn nội bộ của Next.js và các file tĩnh (ảnh, icon...)
  matcher: ['/', '/(vi|en)/:path*']
};