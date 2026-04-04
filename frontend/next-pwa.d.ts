declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  type PWAOptions = {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
  };

  export default function withPWAInit(options?: PWAOptions): (config: NextConfig) => NextConfig;
}
