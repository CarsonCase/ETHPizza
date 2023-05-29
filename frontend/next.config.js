/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env:{
    SALES_TAX_RATE: process.env.SALES_TAX_RATE,
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT
  }
}

module.exports = nextConfig
