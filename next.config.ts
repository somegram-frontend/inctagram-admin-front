import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use '@/app/_shared/assets/styles/_viewport.scss' as *;`,
  },
  images: {
    domains: ['somegram.storage.yandexcloud.net'],
  },
};

export default nextConfig;
