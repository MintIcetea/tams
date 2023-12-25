/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tams",
        permanent: true,
      },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
