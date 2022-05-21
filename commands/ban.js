module.exports = {
    name: "ban",
    description: "Ban a person",
    execute(message, args){
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("You don't have permission")
        let member = message.mentions.members.first()
        if (!member) return message.reply("Please mention a valid member")
        if (!member.bannable) return message.reply("I can't ban this person!")
        member.ban()
    }
}