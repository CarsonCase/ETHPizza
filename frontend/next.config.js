/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env:{
    SALES_TAX_RATE: process.env.SALES_TAX_RATE
  }
}

module.exports = nextConfig
