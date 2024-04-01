/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "*.googleusercontent.com",
            },
            {
                hostname: "*.unsplash.com",
            }
        ]
    }
};

export default nextConfig;
