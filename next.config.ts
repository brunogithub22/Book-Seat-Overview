/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost/api/:path*", // nginx
      },
    ];
  },
};

module.exports = nextConfig;