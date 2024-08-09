/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    RESEMBLE_API_KEY: process.env.RESEMBLE_API_KEY,
    RESEMBLE_PROJECT_UUID: process.env.RESEMBLE_PROJECT_UUID,
    RESEMBLE_VOICE_UUID: process.env.RESEMBLE_VOICE_UUID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/private/**",
      },
    ],
  },
};

export default nextConfig;
