const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const { isContext } = require("vm")
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))


let AOE = 0

//COUNTING VARIABLES
const limit = 5
let current = 0
let currentpage = 1
const totalpages = Math.ceil(commandFiles.length / limit)
//AMOUNT OF COMMANDS
let commandsDone = []


function resetBoth(embed){
    embed.fields = []
    commandsDone = []

    return embed
}



//TODO: Need it to check how many commands its displayed, so we can update it accordingly


function setFieldsFirst(embed){
    embed = resetBoth(embed)

    
    for(const filename of commandFiles){

        if(current >= limit){
            current = 0
            break
        }else{
            
            const cmd = require(`../commands/${filename}`)

            if(commandsDone.includes(cmd.name)) {
                
            }else{

                embed.addField(cmd.name,  cmd.description)
                commandsDone.push(cmd.name)
                current += 1
            }
        }
    }

    if(commandsDone.length === commandFiles.length){
        commandsDone = []
    }
    console.log(commandsDone)
    return embed
}

// If its fully finished then it tries resetting but goes over function again maybe then keeps first 3 so it doesnt reset first 3 but it actually does and loops over it so it looks lie kit hasnt but it actuall y has


function setFieldsSecond(embed){

    //RESET FIELDS
    embed.fields = []

    if(commandsDone.length === commandFiles.length){
        commandsDone = []
    }

    //BEGIN LOOP
    for(const filename of commandFiles){
        
        const cmd = require(`../commands/${filename}`)
        // check if we're at limit
        if(current >= limit){
            current = 0
            break

        //check if cmd done
        }else if(commandsDone.includes(cmd.name)) {
            
        }else{
        // adds to the field & cmd done
            embed.addField(cmd.name,  cmd.description)
            commandsDone.push(cmd.name)
            current += 1
        }

    }
    if(embed.fields === []){
        embed = setFieldsFirst(embed)
    }
    console.log(commandsDone)


    return embed
}



console.log(totalpages)
module.exports = {
    name: "help",
    description: "Display all available commands",
    async execute(message, args, client){

        let page = new MessageEmbed()
        page.setColor('#0099ff')
        page.setTitle("**THE HELP MENU**")
        page.setDescription("**-----------------**")
        
        page = setFieldsFirst(page)



        let me = await message.channel.send({embeds: [page]})
        console.log(commandsDone)
        me.react("⏮️")
        me.react("⏭️")


        let filter = (reaction, user) => user.id !== client.user.id
        let collector = me.createReactionCollector({
            filter,
            time: 60000,
        })

        collector.on("collect", function (reaction, user) {
            reaction.users.remove(user.id)
            if(user.id !== message.author.id) return

            //PREVIOUS/FIRST

            if(reaction.emoji.name === "⏮️"){
                currentpage = currentpage - 1
                myPage = setFieldsFirst(page)
                if(me !== undefined){
                    me.edit({embeds: [myPage]})
                }
            }

            //NEXT/SECOND
            if(reaction.emoji.name === "⏭️"){
                currentpage = currentpage + 1
                myPage = setFieldsSecond(page)
                if(me !== undefined){
                    me.edit({embeds: [myPage]})
                }
        }})

    }
}