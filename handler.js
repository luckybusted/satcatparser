'use strict';


const request = require("axios");
const {extractData} = require('./helpers');
let firebase = require('firebase');

module.exports.getsatcatboxscore = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  let config = {
    apiKey: "AIzaSyDzP86erCckOKENIaFTqR0MpxZwG-VJbhY",
    authDomain: "satcatparser.firebaseapp.com",
    databaseURL: "https://satcatparser.firebaseio.com",
    projectId: "satcatparser",
    storageBucket: "satcatparser.appspot.com",
    messagingSenderId: "90035590416"
  };

  if(firebase.apps.length === 0) {   // <---Important!!! In lambda, it will cause double initialization.
      firebase.initializeApp(config);
  }

  let satData;

  request('https://www.celestrak.com/satcat/boxscore.asp')
    .then(({data}) => {
      satData = extractData(data);

      console.log('satDATA: ', satData)

    })
    .then(response => {
      firebase.database().ref().child('data').set(satData, function(){
        process.exit(0);
        console.log('pushed to FIREBASE');

      })
    })
    .then(() => {
      callback(null, 'END2' + satData);
    })
    .catch(callback);
};




