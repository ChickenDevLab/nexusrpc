const { Client } = require('discord-rpc')
const path = require('path')
const fetch = require('node-fetch')
const ms = require('./minestats')

const clientId = '750725647495856149';

const rpc = new Client({ transport: 'ipc' });
const startTimestamp = new Date();

const arr = new Array(0, 1, 2, 3, 4, 5, 6, 7)
const item = arr[Math.floor(Math.random() * arr.length)].toString()

async function setActivity() {
    if (!rpc) {
        return;
    }
    let data
    ms.init('mc-nexus.de', 25565, function (result) {
        if (ms.online) {
            data = {
                state: 'Online (' + ms.version + "): " + ms.current_players + " von " + ms.max_players + " Spieler",
                details: ms.motd.split("\n")[1].substr(3)
            }
        }
        else {
            data = {
                details: 'Mc-Nexus.de | Deine Minecraft-Community',
                state: 'Offline'
            }
        }
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
    })
    // You'll need to have snek_large and snek_small assets uploaded to
    // https://discord.com/developers/applications/<application_id>/rich-presence/assets
    
}

rpc.on('ready', () => {
    setActivity();
});

rpc.login({ clientId }).catch(console.error);

process.on('exit', () => {
    rpc.destroy()
})

setInterval(setActivity, 60 * 1000)

