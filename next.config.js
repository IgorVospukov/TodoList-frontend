/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_USER_LOGIN: process.env.API_USER_LOGIN,
    API_USER_REGISTER: process.env.API_USER_REGISTER,
  }
}

module.exports = nextConfig

