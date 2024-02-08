/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Enables source maps in development mode for both server-side and client-side
    if (!isServer) {
      config.devtool = "source-map";
    }

    // Return the modified config
    return config;
  },
};

export default nextConfig;
