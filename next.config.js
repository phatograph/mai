module.exports = {
  basePath: process.env.NODE_ENV == 'production' ? '/mai' : '',
  assetPrefix: process.env.NODE_ENV == 'production' ? '/mai' : '',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    })

    return config
  },
}
