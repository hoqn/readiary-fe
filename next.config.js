/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [`${__dirname}/src/styles`],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )
    return config;
  },
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://3.37.121.16:8080/api/:path*"
    }
  ]
}

module.exports = nextConfig
