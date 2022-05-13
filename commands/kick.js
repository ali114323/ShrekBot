module.exports = {
    name: "kick",
    description: "Kick a person",
    execute(message, args){
        let member = message.mentions.members.first()
        if (!member) return message.reply("Please mention a valid member")
        if (!member.kickable) return message.reply("I can't kick this person!")
        member.kick()
    }
}