require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    env: {
        API_URL: process.env.API_URL
    }
}

module.exports = nextConfig
