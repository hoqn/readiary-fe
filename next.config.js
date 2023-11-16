/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [`${__dirname}/src/styles`]
  }
}

module.exports = nextConfig
