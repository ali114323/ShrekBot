module.exports = {
    name: "ping",
    description: "Command handler testing",
    execute(message, args){
        if(message.member.roles.cache.has(''))
        message.reply("It works! ")
    }
}