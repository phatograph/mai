module.exports = {
  basePath: process.env.NODE_ENV == 'production' ? '/mai' : '',
  assetPrefix: process.env.NODE_ENV == 'production' ? '/mai/' : '',
  rewrites: async () => {
    return [
      { source: '/docs/_next/:path*', destination: '/_next/:path*' }
    ]
  },
  // trailingSlash: true,
  // exportPathMap: async (
  //   defaultPathMap,
  //   {dev, dir, outDir, distDir, buildId}
  // ) => {
  //   return {
  //     '/': {page: '/'},
  //   }
  // },
}
