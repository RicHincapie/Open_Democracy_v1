#!/usr/local/bin/node

/*
Function to insert in the general GeoJson a key 'metadata'
with two keys 'carto_index_[high | low] to be passed as 
limits to the Comunas Cloropleth for Carto.
*/

let my_json = require('./Api_comunas_response_results_JIO.json');
// console.log(my_json.features[0]);

let my_result = normalizeDataCloropleth(my_json); // Call to the function

console.log(my_result.features[0]); // Test to print


function normalizeDataCloropleth(data) {
  let my_votes = []; // Takes the votes to run analysis. 
  data.features.forEach(function (item) {
    my_votes.push(item.properties.votos);
  });
  
  my_votes.sort(function(a, b) {
    return a - b;
  });

  let carto_index_high = my_votes[my_votes.length - 1];
  let carto_index_low = my_votes[0];
  
  data.features.forEach(function (item){
    item['properties']['carto_index_high'] = carto_index_high
    item['properties']['carto_index_low'] = carto_index_low
  });

  return data;
};
