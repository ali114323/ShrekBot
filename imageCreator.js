const Canvas = require("canvas");
const Discord = require("discord.js")

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
const imageCreator = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "jpg", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(1200, 670)
    const ctx = canvas.getContext("2d")
    //drawing background
    const backimg = await Canvas.loadImage("images/bg.jpg")
    ctx.drawImage(backimg, 0, 0)

    //drawing box
    ctx.fillStyle = "rgba(0,0,0,.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size /2, av.size/2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    
    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()


    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    ctx.font = "50px Sans"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 70)
    ctx.font = "60px Sans"
    ctx.fillText(username + discrim, dim.width/2, dim.height - dim.margin - 125)

    ctx.font = "40px Sans"
    ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50)


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")

    return attachment

}

module.exports = imageCreator