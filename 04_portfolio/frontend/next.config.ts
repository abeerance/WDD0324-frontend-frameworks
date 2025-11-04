import type { NextConfig } from "next";

/**
 * Next.js Configuration
 *
 * Configures Next.js build and runtime behavior for the application
 */
const nextConfig: NextConfig = {
  /**
   * Image Optimization Configuration
   *
   * Defines allowed external domains for next/image component
   * Images from these domains will be optimized by Next.js Image Optimization API
   */
  images: {
    /**
     * Remote Patterns
     * Whitelist of allowed image sources with specific protocols, hostnames, ports, and paths
     *
     * Security: Only images matching these patterns can be served through next/image
     * This prevents malicious external image URLs from being processed
     */
    remotePatterns: [
      /**
       * Local Development API
       * Allows images from local Laravel backend during development
       */
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/**" },

      /**
       * Unsplash CDN
       * Allows images from Unsplash for demo/seeded content
       * Used for placeholder images in development and testing
       */
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;
