const fs = require('fs');

const file = fs.readFileSync('./firebase.json')

let config = JSON.parse(file.toString());

const channel = process.env.channel;

config.hosting.site = channel || 'waik-main-dev'

console.log(config);

fs.writeFileSync('./firebase.json', JSON.stringify(config))