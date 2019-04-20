'use strict';

const request = require('axios');
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
      // todo: function didnt close itself and causes an timeout...
    })
    .then(response => {
      firebase.database().ref().child('data').set(satData, function(){
        process.exit(0);
      });
    })
    .then(() => {
      callback(null, 'END');
    })
    .catch(callback);
};




