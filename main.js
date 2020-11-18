const { Client } = require('discord-rpc')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')

const sysRoot = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const dataDir = path.join(sysRoot, '.nexusrpc')

const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'infos.json'), { encoding: 'utf8', flag: 'r' }))
if(!(data.details && data.state)){
    fetch('https://chickendevlab.github.io/nexusrpc/infos.json').then(res => res.json())
    .then(json => {
        data = json
        fs.writeFile(path.join(dataDir, 'infos.json'), JSON.stringify(data), (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n"); 
            } 
          })
    })
}

const clientId = '750725647495856149';

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

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