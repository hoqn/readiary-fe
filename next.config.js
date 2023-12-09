const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

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
        // https://github.com/vercel/next.js/issues/48177#issuecomment-1506251112
        // issuer: /\.[jt]sx?$/,
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
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.console.aws.amazon.com",
        port: "",
        pathname: "/s3/object/bookdiary-bucket",
      },
      {
        protocol: "https",
        hostname: "bookdiary-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/**",
      },
    ]
  }
}

module.exports = withPWA(nextConfig);
