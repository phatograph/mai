module.exports = {
  basePath: process.env.NODE_ENV == 'production' ? '/mai' : '',
  assetPrefix: process.env.NODE_ENV == 'production' ? '/mai/' : '',
  trailingSlash: true,
  // exportPathMap: async (
  //   defaultPathMap,
  //   {dev, dir, outDir, distDir, buildId}
  // ) => {
  //   return {
  //     '/': {page: '/'},
  //   }
  // },
}
