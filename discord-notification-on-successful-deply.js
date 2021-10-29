const admin = require('firebase-admin');
const Discord = require('discord.js');

admin.initializeApp();

const client = new Discord.Client();

const db = admin.firestore()

db.collection('waik').doc('bot').get().then(async (doc) => {
    await client.login(doc.data().token);
    await awaitLogin;
    const channel = await client.channels.fetch('871116634889289799');
    if (channel.isText()) await channel.send('<@&871116266281246750> Új beta verzió elérhető! https://beta.waik.zal1000.com/');
    client.destroy()
    process.exit()
});

const awaitLogin = new Promise((resolve, reject) => {
    client.once('ready', () => {
        resolve();
    });
  });