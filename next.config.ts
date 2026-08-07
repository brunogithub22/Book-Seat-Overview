/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost/api/:path*", // Rewrites to Nginx on port 80
      },
    ];
  },
};

module.exports = nextConfig;