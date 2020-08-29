module.exports = {
  basePath: process.env.NODE_ENV == 'production' ? '/mai' : '',
  assetPrefix: process.env.NODE_ENV == 'production' ? '/mai' : '',
  target: 'serverless',
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/_next/:path*',
  //       destination: '/_next/:path*',
  //     },
  //   ]
  // },
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
