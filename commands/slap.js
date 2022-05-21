const Canvas = require("canvas");
const Discord = require("discord.js")
const { readFile } = require("fs/promises")

const dim = {
    height: 670,
    width: 1200,
    margin: 50
}
const av = {
    size: 256,
    x: 480,
    y: 170
}
const slaphim = async (message) => {
    
    member = message.mentions.members.first()
    if(!member) return message.reply("You need to mention who to slap! ")
    let avatarURL = member.user.displayAvatarURL({format: 'jpg', size: av.size})
    console.log(avatarURL)

    //const backimg = await readFile("./images/theSlap.png")
    const canvas = Canvas.createCanvas(1400, 700)
    const ctx = canvas.getContext("2d")
    //drawing background

    const backimg = await Canvas.loadImage("theSlap.jpg")
    ctx.drawImage(backimg, 0, 0)

    //drawing box
    ctx.fillStyle = "rgba(0,0,0,.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    ctx.save()

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size /2, av.size/2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    
    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")

    return attachment

}

module.exports = slaphim