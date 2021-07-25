const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

// Using the env variables
require('dotenv').config();
const BOT_TOKEN = process.env.BOT_TOKEN;

// Taking in variables from the config files
const config = require('./config.json');
let prefix = config.prefix


// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  console.log('Ready!');
});

// login to Discord with your app's token

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

  // if (!message.author.bot){
  //   let msg = message
  //   message.channel.send(`\`\`\` ${msg} \`\`\``)
  //   console.log("NEW MESSAGE \n \n")
  //   console.log(message)
  //   console.log("\n\n")
  // }
});

client.login(BOT_TOKEN);
