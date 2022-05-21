const { MessageEmbed } = require("discord.js")

const helpEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('**THE HELP MENU**')
    .setDescription('**-----------**')
    .setAuthor({name: 'Click me!', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'})
    .addFields(
        {name: '**-help**', value: 'Access the help command'},
        {name: '**-kick**', value: '-kick (user)'},
        {name: '**-ban**', value: '-ban (user)'},
        {name: '**-mute**', value: '-mute (user) **Must have a muted role!**'},
        {name: '**-unmute**', value: '-unmute (user)'}
    )
    .setFooter({ text: 'Just testing lol'})


module.exports = {
    name: "help",
    description: "Display all available commands",
    execute(message, args){
        message.reply({embeds: [helpEmbed]})
    }
}