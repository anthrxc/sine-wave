require("dotenv").config({ path: `${process.cwd()}/src/.env`});

const path = require("path");
const { Client } = require("discord.js");

const client = new Client({ disableMentions: "all" });

client.on("ready", () => {
    console.clear();
    console.log("---------------------------------------------\nSine Wave is ready to bleed people's ears out\n---------------------------------------------");
});

client.on("voiceStateUpdate", async voice => {
    const { channel, id, deaf, setDeaf } = voice;
    
    if(!channel) {
        if(id == client.user.id) {
            if(deaf) return;
            else setDeaf(true, "Self-deaf");
        }
        else return;
    }
    else return;
});

client.on("message", async message => {
    const { guild, channel, member, mentions } = message;
    
    if(mentions.members.find(x => x.id == client.user.id)) {
        if(guild.me.voice.channel || !member.voice.channel) return;
        else {
            const voiceChannel = message.member.voice.channel;
            if(voiceChannel.viewable && voiceChannel.joinable) {
                
                voiceChannel.join().then(
                    voice => {
                        voice.play(path.join(__dirname, "sine-wave.mp3"));
                    }
                );
                setTimeout(() => { voiceChannel.leave(); }, 32000);
            }
            else channel.send("nah");
        }
    }
    else return;
});

client.login(process.env.TOKEN);
