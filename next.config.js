module.exports = {
  basePath: process.env.NODE_ENV == 'production' ? '/mai' : '',
  assetPrefix: process.env.NODE_ENV == 'production' ? 'https://phatograph.github.io/mai/' : '',
  // exportTrailingSlash: true,
  // exportPathMap: async (
  //   defaultPathMap,
  //   {dev, dir, outDir, distDir, buildId}
  // ) => {
  //   return {
  //     '/': {page: '/'},
  //   }
  // },
}
