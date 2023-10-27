const path = require("path");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // @svgr/webpack 설정: https://react-svgr.com/docs/next/

    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        // resourceQuery: { not: /url/ }, // exclude if *.svg?url
        resourceQuery: /svgr/,
        use: [{ loader: "@svgr/webpack" }],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    // CSS Modules Pascalcase

    // config.module.rules
    //   .find(({ oneOf }) => !!oneOf)
    //   .oneOf.filter(({ use }) => JSON.stringify(use)?.includes("css-loader"))
    //   .reduce((ac, { use }) => ac.concat(use), [])
    //   .forEach(({ options }) => {
    //     if (options.modules) options.modules.exportLocalsConvention = "camelCaseOnly";
    //   });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },

  images: {
    remotePatterns: [
      // 도서 썸네일
      {
        protocol: "https",
        hostname: "bookthumb-phinf.pstatic.net",
        port: "",
        pathname: "cover/**",
      },
    ],
    domains: ["bookthumb-phinf.pstatic.net", "image.aladin.co.kr"],
  },
};

module.exports = withPWA(nextConfig);
