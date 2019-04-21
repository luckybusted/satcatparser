'use strict';

const cheerio = require('cheerio');
const moment = require('moment');

function extractData (html) {

  const $ = cheerio.load(html);
  const dataTable = $("table.center tbody tr[align='right']");
  //const dataTable = $("center table tbody table tbody tr[align='RIGHT']");

  const satellites = [];
  dataTable.each((i, el) => {

    // Extract information from each row of the satellites table
    //let closing = $(el).children('.views-field-field-vacancy-deadline').first().text().trim();
    //let job = $(el).children('.views-field-title').first().text().trim();
    //let location = $(el).children('.views-field-name').text().trim();
    //closing = moment(closing.slice(0, closing.indexOf('-') - 1), 'DD/MM/YYYY').toISOString();

    let row = $(el).text().trim();
    let country = $(el).children("td[align='left']").text().trim();
    let plOrbit = {'orbit' : $(el).children("td:nth-child(2)").text().trim()};
    let plDecayed = {'decayed' : $(el).children("td:nth-child(3)").text().trim()};
    let plTotal = {'total' : $(el).children("td:nth-child(4)").text().trim()};
    let plActive = {'active' : $(el).children("td:nth-child(5)").text().trim()};

    let dbOrbit = {'orbit' : $(el).children("td:nth-child(6)").text().trim()};
    let dbDecayed = {'decayed' : $(el).children("td:nth-child(7)").text().trim()};
    let dbTotal = {'total' : $(el).children("td:nth-child(8)").text().trim()};

    let allOrbit = {'orbit' : $(el).children("td:nth-child(9)").text().trim()};
    let allDecayed = {'decayed' : $(el).children("td:nth-child(10)").text().trim()};
    let allTotal = {'total' : $(el).children("td:nth-child(11)").text().trim()};

    let payload = [plOrbit, plDecayed, plTotal, plActive];
    let debris = [dbOrbit, dbDecayed, dbTotal];
    let all = [allOrbit, allDecayed, allTotal];

    satellites.push({country, payload, debris, all});
  });

  return satellites;
}

module.exports = {
  extractData
};
