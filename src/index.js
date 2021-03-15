require('dotenv').config({ path: `${process.cwd()}/src/.env`});

const path = require('path');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'all' });

client.on('ready', () => {
    console.clear();
    console.log('---------------------------------------------\nSine Wave is ready to bleed people\'s ears out\n---------------------------------------------');
});

client.on('guildCreate', async guild => {

});

client.on('message', async message => {
    console.log(message.guild.me.voice.channel);
    if(message.mentions.members.find(user => user.id == "820626962434621450")) {
        if(message.member.voice.channel) {
            if(message.guild.me.voice.channnel != message.member.voice.channel) return;
            if(message.member.voice.channel.viewable && message.member.voice.channel.speakable) {
                message.member.voice.channel.join().then(bot => {
                    bot.play(path.join(__dirname, "sine-wave.mp3"));
                });
                setTimeout(() => message.member.voice.channel.leave(), 35000);
            }
            else return;
        }
        else return;
    }
    else return;
});

client.login(process.env.TOKEN);