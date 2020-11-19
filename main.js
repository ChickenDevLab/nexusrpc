const { Client } = require('discord-rpc')
const path = require('path')
const fetch = require('node-fetch')
const ms = require('./minestats');

let data
let colorCodes = ['\u00A70', '\u00A71', '\u00A72', '\u00A73', '\u00A74', '\u00A75', '\u00A76', '\u00A77']
ms.init('mc-nexus.de', 25565, function (result) {
    console.log("Minecraft server status of " + ms.address + " on port " + ms.port + ":");
    if (ms.online) {
        data = {
            state: 'Online (' + ms.version + "): " + ms.current_players + " von " + ms.max_players + " Spieler",
            details: ms.motd.split("\n")[1].replace(/(\u00a7[0-9A-Fa-f])/g, '')
        }
    }
    else {
        data = {
            details: 'Mc-Nexus.de | Deine Minecraft-Community',
            state: 'Offline'
        }
    }
    console.log(data.details)
    const clientId = '750725647495856149';

    const rpc = new Client({ transport: 'ipc' });
    const startTimestamp = new Date();

    const arr = new Array(0, 1, 2, 3, 4, 5, 6, 7)
    const item = arr[Math.floor(Math.random() * arr.length)].toString()

    async function setActivity() {
        if (!rpc) {
            return;
        }
        // You'll need to have snek_large and snek_small assets uploaded to
        // https://discord.com/developers/applications/<application_id>/rich-presence/assets
        rpc.setActivity({
            details: data.details,
            state: data.state,
            startTimestamp,
            largeImageKey: item,
            largeImageText: 'Ein Bild von MC-Nexus.de',
            smallImageKey: 'seal-circle',
            smallImageText: 'MC-Nexus.de - Logo',
            instance: false,
        });
    }

    rpc.on('ready', () => {
        setActivity();
    });

    rpc.login({ clientId }).catch(console.error);

    process.on('exit', () => {
        rpc.destroy()
    })

});

