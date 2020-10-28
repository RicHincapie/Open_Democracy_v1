#!/usr/local/bin/node
/*
Function to insert in each puesto property a key 'carto_index'
with a index value between 10 and 40 that represents its weight
to be the point size in Carto
*/

let my_json = require('./Api_response_results_JIO.json');
// console.log(my_json.features[0]);

let my_result = normalize_data(my_json); // Call to the function

console.log(my_result); // Test to print

function normalizeData(data) {
    let my_votes = [] // Takes the votes to run analysis. 
    
    data.features.forEach(function (item) {
      my_votes.push(item.properties.votos);
    });
   
    my_votes.sort(function(a, b) {
      return a - b;
    });
    // Range substracts lower voting to higher one
    let carto_index_high = my_votes[my_votes.length - 1];
    let carto_index_low = my_votes[0];

    let range = (carto_index_high - carto_index_low);

    // How many positions will be introduced to Carto. 
    let carto_range = 29;
    let bins_size = range / carto_range;
    // Each feature gets a new key:value
    data.features.forEach(function (item) {
      item['properties']['carto_index'] = (Math.round(item.properties.votos / bins_size)) + 10;
      item['properties']['carto_index_high'] = carto_index_high;
      item['properties']['carto_index_low'] = carto_index_low;
    });

    return data;
};