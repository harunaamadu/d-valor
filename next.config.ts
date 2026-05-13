import type { NextConfig } from 'next'

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ...(sanityProjectId && sanityDataset
        ? [
            {
              protocol: 'https' as const,
              hostname: 'cdn.sanity.io',
              pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
            },
          ]
        : []),
    ],
  },
}

export default nextConfig
