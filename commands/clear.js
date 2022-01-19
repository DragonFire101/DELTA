module.exports = {
	name: 'clear',
	description: 'deletes specific users messages.',
	execute(commandMessage, args) {
        var targetUserId = args[0] || "29132786522294560";
        commandMessage.channel.messages.cache.forEach(message => {
          if (message.author.id == targetUserId)
            message.delete();
        })
      }
};
