/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      maptilerApiKey: process.env.MAPTILER_API_KEY, // pulls from .env file
    }
}

module.exports = nextConfig
