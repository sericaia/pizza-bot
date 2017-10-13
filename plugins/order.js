var pizzapi = require('dominos') // or without payment option use require('pizzapi');

const getStores = (address, callback) => {
  pizzapi.Util.findNearbyStores(
    address,
    'Delivery',
    (storeData) => {
      const stores = storeData.result.Stores
      const filteredStores = stores.filter((store) => store.IsOpen && store.IsOnlineCapable && store.IsOnlineNow)

      const openStores = filteredStores
        .map((store) => {
          return `${store.StoreID}: ${store.AddressDescription}`
        })
        .sort()

      callback(null, openStores)
    }
  )
}

const setUpConversation = (err, convo) => {
  if (err) throw err

  convo.addQuestion('Ok, thanks. What is your address?', (responseObj) => {
    getStores(responseObj.text, (err, result) => {
      if (err) throw err
      console.log(result)
      convo.setVar('store', 'bla')
      convo.gotoThread('thread_2')
    })
  }, {}, 'thread_1')
  // convo.addMessage('Ok, I\'m going to check!', 'thread_2')

  convo.addMessage(`{{vars.store}}`, 'thread_2')

  convo.activate()
  convo.gotoThread('thread_1')
}

module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      return bot.createConversation(message, setUpConversation)
    })
    // bot.reply(message, openStores)
  },
  help: {
    command: 'welcome',
    text: `This command helps you to start the process of buying pizza!`
  }
}
