module.exports = {
    name: "mute",
    description: "Mute a person",
    execute(message, args, client){
        let member = message.mentions.members.first()
        let mutedRole = message.guild.roles.cache.find(mute => mute.name === 'muted')
        if (!member) return message.reply("Please mention a valid member")
        if (!mutedRole) return message.reply("I cannot find a muted role, please make one")
        if(member.roles.cache.find(r => r.name === 'muted')) return message.reply("That person is already muted!")
        member.roles.add(mutedRole)

    }
}