/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.snipp.gg",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com", // Corrected the hostname
      },
    ],
  },
};

export default nextConfig;