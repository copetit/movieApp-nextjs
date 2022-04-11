/** @type {import('next').NextConfig} */
module.exports = { target: "serverless" };

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/images/:id",
        destination: `https://api.themoviedb.org/3/movie/:id/images?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
