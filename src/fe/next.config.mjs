/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: false,
  transpilePackages: ["azle"],
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    loader: "custom",
    // path: "http://localhost:3000/2024/porsenigama",
    // path: "https://ukm.ugm.ac.id/2024/porsenigama",
    loaderFile: "./src/loader.js",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      //   {
      //     protocol: "https",
      //     hostname: "ukm.ugm.ac.id",
      //     port: "",
      //   },
    ],
  },

  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.mainFields = ["browser", "module", "main"];
    config.experiments.asyncWebAssembly = true;
    return config;
  },
};

export default nextConfig;
