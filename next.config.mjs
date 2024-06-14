/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: '/movie-spring/**/**',
      }
    ],
  },
};

export default nextConfig;
