/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8009",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
