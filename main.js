/*  BOT PERMISSIONS              https://discordapi.com/permissions.html
    MEGUMIN CONFIGURE PORTAL     https://discord.com/developers/applications
    MEGUMIN AUTHORIZATION        https://discord.com/oauth2/authorize?client_id=791926816599179284&scope=bot&permissions=2147483647
*/ 

"use strict"
const Discord = require('discord.js');                              // import the discord.js module
const { prefix, token } = require('./config.json');                 // import the config module
const { member_identity, category } = require('./database.json');   // import the database module

const { Client, MessageEmbed } = require('discord.js');             // extract elements of Discord client
const client = new Client();                                        // create instance of new Discord client
const embed = new MessageEmbed();                                   // create instance of new MessageEmbeds

// when the client is ready, run this code
// this event will only trigger one time after logging in

client.on('ready', () => {
    console.log('Konnichiwa, watashi wa megumin onraindesu!'); 
    client.channels.fetch('791999722394877964')
    .then(channel => {
        // channel.send('Konnichiwa, watashi wa megumin onraindesu!');
        embed.setAuthor('Konnichiwa, watashi wa megumin onraindesu!').setColor(16724787);
        channel.send(embed);
    })
});


/* capitalize the first letter of the first word

    let capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
*/

client.on('presenceUpdate', (oldPresence, newPresence) => {
    let member = newPresence.member;

    // let allowedRole = message.guild.roles.find("name", "rolename");


//     text = `Our ${(role)} ${name} is now online`;
//      } else if (newPresence.status === "offline") {
//     text = `Oh no! Our ${(role)} ${name} went offline`;
        
    const statusListner = (role, name) => {
        let role_cache = member.guild.members.cache;
        let text = '';
        
        if (newPresence.status === "online") {
            text = `(>'o')>   Our ${(role)} ${name} is now online   <('o'<) `;
        } 
        else if (newPresence.status === "offline") {
            text = `(>'o')>   Oh no! Our ${(role)} ${name} went offline   <('o'<)`;
        } 

        return embed.setAuthor(text);
    }

    
    if (oldPresence.status !== newPresence.status) {
        // Your specific channel to send a message in.
        // You can also use member.guild.channels.resolve('');
        
        const channel = member.guild.channels.cache.get(category.channel['experimental']);
            
        // User id of the user you're tracking status.
        if (member.id === member_identity.XaxoriJoey.id) {
            embed.setColor(16711729);
            channel.send(statusListner(member_identity.XaxoriJoey.role, member_identity.XaxoriJoey.name));
        }

        // User id of the user you're tracking status.
        else if (member.id === member_identity.shrimp.id) {
            embed.setColor(16741120);
            channel.send(statusListner(member_identity.shrimp.role, member_identity.shrimp.name));
        }

        // User id of the user you're tracking status.
        else if (member.id === member_identity.meow.id) {
            embed.setColor(32255);
            channel.send(statusListner(member_identity.meow.role, member_identity.meow.name));
        }

        // User id of the user you're tracking status.
        else if (member.id === member_identity.kyouyo.id) {
            embed.setColor(32255);
            channel.send(statusListner(member_identity.kyouyo.role, member_identity.kyouyo.name));
        }

        // User id of the user you're tracking status.
        else if (member.id === member_identity.cornbits.id) {
            embed.setColor(14988288);
            channel.send(statusListner(member_identity.cornbits.role, member_identity.cornbits.name));
        }
    }
});

/*
    // First we use guild.members.fetch to make sure all members are cached
    guild.member.fetch().then(fetchedMembers => {
        const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
        // We now have a collection with all online member objects in the totalOnline variable
        console.log(`There are currently ${totalOnline.size} members online in this guild!`)
    });
*/

client.on('message', message => {
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    switch (command) {
        case 'embed':
            embed.setTitle('A slick little embed')
                 .setColor(member_identity.Megumin.color)
                 .setDescription('Hello, this is a slick embed!');
            message.channel.send(embed);
            break;

        case 'ping':
            message.channel.send('Pong.');
            break;

        case 'beep':
            message.channel.send('Boop');
            break;

        case 'server':
            message.channel.send(`Server name: ${message.guild.name}`);
            message.channel.send(`Total members: ${message.guild.memberCount}`);
            message.channel.send(`Created at: ${message.guild.createdAt}`);
            message.channel.send(`Server region: ${message.guild.region}`);
            message.channel.send(`Maximum members: ${message.guild.maximumMembers}`);
            break;

        case 'status':
            message.channel.send(`${client.user.username} is now ${client.user.presence.status}`);
            break;
    }
});


client.login(token); // login to Discord with your app's token on config.json module