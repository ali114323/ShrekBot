module.exports = {
    name: "ping",
    description: "Command handler testing",
    execute(msg, args, client){
        msg.reply(`Pong!\nMessage latency is *${Date.now() - msg.createdTimestamp}ms*. Discord API latency is *${Math.round(client.ws.ping)}ms*.`)
    }
}