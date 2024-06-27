/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    ...process.env
  },
  cssModules: true,
  nextScriptWorkers: true,
};

export default nextConfig;
