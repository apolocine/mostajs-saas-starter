/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep @mostajs/orm + the WASM sql.js driver out of the client bundle.
  serverExternalPackages: ['@mostajs/orm', 'sql.js'],
};
export default nextConfig;
