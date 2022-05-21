const Discord = require("discord.js");
require('dotenv').config();
const imageCreator = require("./imageCreator.js")
const fs = require("fs")

const TOKEN = process.env.TOKEN;
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})
const prefix = '-'

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);

    client.user.setPresence({
        activity: {
            name: `Use ${prefix}help`
        },
    })
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;


    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args, client)
    }else if(command === "kick"){
        client.commands.get('kick').execute(message,args)
    }else if(command === "mute"){
        client.commands.get('mute').execute(message,args)
    }else if(command === "unmute"){
        client.commands.get('unmute').execute(message,args)
    }else if(command === "ban"){
        client.commands.get('ban').execute(message,args)
    }else if(command === "help"){
        client.commands.get('help').execute(message,args)
    }
})

//const welcomeChannelId = client.guild.channels.cache.find(channel => channel.name === "general")
/*
client.on("guildMemberAdd", async (member) => {
    const img = await(imageCreator(member))
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server! `,
        files: [img]
    })
})

client.on("guildMemberRemove", (member) => {
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `${member.displayName} has left.`
    })
})
*/ 


client.login(TOKEN);