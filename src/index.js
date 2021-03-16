require('dotenv').config({ path: `${process.cwd()}/src/.env`});

const path = require('path');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'all' });

client.on('ready', () => {
    console.clear();
    console.log('---------------------------------------------\nSine Wave is ready to bleed people\'s ears out\n---------------------------------------------');
});

client.on('voiceStateUpdate', async voice => {
    if(!voice.channel) {
        if(voice.id == client.user.id) {
            if(voice.deaf) return;
            else voice.setDeaf(true, "Self-deaf");
        }
        else return;
    }
    else return;
});

client.on('message', async message => {
    if(message.mentions.members.find(x => x.id == client.user.id)) {
        if(message.guild.me.voice.channel || !message.member.voice.channel) return;
        else {
            if(message.member.voice.channel.viewable && message.member.voice.channel.joinable) {
                const channel = message.member.voice.channel;
                channel.join().then(
                    voice => {
                        voice.play(path.join(__dirname, "sine-wave.mp3"));
                    }
                );
                setTimeout(() => { channel.leave(); }, 32000);
            }
            else return;
        }
    }
    else return;
});

client.login(process.env.TOKEN);