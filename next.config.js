module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/featured/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/736x/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/free-photo/**',
      },
    ],
  },
}