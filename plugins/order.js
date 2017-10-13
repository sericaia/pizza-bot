module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      bot.reply(message, `Howdy! <@${message.user}> I'm looking to nearby stores!`)
    })
  },
  help: {
    command: 'welcome',
    text: `This command helps you to start the process of buying pizza!`
  }
}
