/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    ...process.env
  },
  cssModules: true,
  nextScriptWorkers: true,
};

export default nextConfig;
