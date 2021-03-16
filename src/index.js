require('dotenv').config({ path: `${process.cwd()}/src/.env`});

const path = require('path');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'all' });

client.on('ready', () => {
    console.clear();
    console.log('---------------------------------------------\nSine Wave is ready to bleed people\'s ears out\n---------------------------------------------');
});


client.login(process.env.TOKEN);