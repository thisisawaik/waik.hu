"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const admin =require('firebase-admin');
//import from '@tensorflow/tfjs';
const tf = require("@tensorflow/tfjs-automl");
const fs = require('fs');
//admin.initializeApp();
//app.listen(process.env.PORT || 8080,  () => {
//    console.log(`Listening on ${process.env.PORT || 8080}`)
//})
checkWithModel();
async function checkWithModel() {
    const model = await tf.loadImageClassification('http://localhost:5500/ml/model.json');
    //await admin.storage().bucket('zal1000.net').file('waik/fanarts/temp/NhgYNASbPNTMbEybXOWTmuHCvUW2/Untitled1.png').download({destination: `./tmp/asd.png`});
    const localfile = fs.readFileSync('./tmp/isti.png');
    console.log(await model.classify(localfile));
}
