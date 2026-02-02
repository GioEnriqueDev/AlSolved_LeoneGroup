/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'AlSolved_LeoneGroup';

const nextConfig = {
    output: 'export',
    // Configure basePath for GitHub Pages project site
    // This ensures assets are loaded from /RepoName/_next/... instead of root
    basePath: isProd ? `/${repoName}` : '',
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
