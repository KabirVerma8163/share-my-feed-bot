module.exports = {
  name: 'avatar',
  description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
  aliases: ['icon', 'pfp'],
  execute(message) {
    if (!message.mentions.users.size) {
      message.channel.send(`Your avatar:`)
      return message.channel.send(`${message.author.displayAvatarURL()}`)
    }

    const avatarList = message.mentions.users.map(user => {
      message.channel.send(`Your avatar:`)
      return message.channel.send(`${user.displayAvatarURL()}`)
    });

    // message.channel.send(avatarList);
  },
};