var pizzapi = require('dominos') // or without payment option use require('pizzapi');

module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      pizzapi.Util.findNearbyStores(
        '11 Times Square, New York, NY 10036',
        'Delivery',
        (storeData) => {
          const stores = storeData.result.Stores
          const filteredStores = stores.filter((store) => store.IsOpen && store.IsOnlineCapable && store.IsOnlineNow)

          const openStores = filteredStores
            .map((store) => {
              return `${store.StoreID}: ${store.AddressDescription.replace(/\n/, '')}\r\n`
            })
            .sort()
            .join()

          bot.reply(message, openStores)
        }
      )
    })
  },
  help: {
    command: 'welcome',
    text: `This command helps you to start the process of buying pizza!`
  }
}
