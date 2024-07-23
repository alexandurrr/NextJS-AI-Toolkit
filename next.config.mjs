/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  images: {
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
  },
};

export default nextConfig;
