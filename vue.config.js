const path = require('path')
module.exports = {
  chainWebpack: config => {
    const apiClient = process.env.VUE_APP_API_CLIENT // mock or server
    config.resolve.alias.set(
      'api-client',
      path.resolve(__dirname, `src/api/${apiClient}`)
    )
  },
  pwa: {
    name: 'SalesApp',
    themeColor: '#198B1E',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: new RegExp('^'+process.env.VUE_APP_MIX_BASE_API),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 60,
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },
}
