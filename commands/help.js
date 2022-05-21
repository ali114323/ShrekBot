const { MessageEmbed } = require("discord.js")
const fs = require("fs")

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

module.exports = {
    name: "help",
    description: "Display all available commands",
    execute(message, args, client){

        let myEmbed = new MessageEmbed()
        myEmbed.setColor('#0099ff')
        myEmbed.setTitle("**THE HELP MENU**")
        myEmbed.setDescription("**-----------------**")
        
        for(const filename of commandFiles){
            const cmd = require(`../commands/${filename}`)
            myEmbed.addField(cmd.name,  cmd.description)
        }

        message.reply({embeds: [myEmbed]})

    }
}