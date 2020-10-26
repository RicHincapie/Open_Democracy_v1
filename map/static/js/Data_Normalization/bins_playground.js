#!/usr/local/bin/node
let fs = require('fs'); // Brings file system manager

data = [{"properties": {"votos": 3500, "name": "Ospina"}}, 
{"properties": {"votos": 2500, "name": "Ospina"}},
{"properties": {"votos": 1300, "name": "Ospina"}},
{"properties": {"votos": 600, "name": "Ospina"}},
{"properties": {"votos": 50, "name": "Michel"}},
{"properties": {"votos": 30, "name": "Michel"}},
{"properties": {"votos": 130, "name": "Michel"}},
{"properties": {"votos": 10, "name": "Michel"}}
]

let votes = Object.values(data)

console.log(votes)


data.forEach(function(item, index, array) {
  item.properties["carto_index"]
  console.log(item, index)
})

let result = []

data.forEach(function(item, index, array) {
  result.push(item.properties.votos)
})

console.log(result);
// Here we're taking data from API
// let my_json = require('./Api_response_results_Michel.json');
let my_json = require('./Api_response_results_JIO.json');
console.log(my_json.features[0]);

// my_votes is where all votes will be stored
let my_votes = []

my_json.features.forEach(function (item) {
  my_votes.push(item.properties.votos);
});

console.log(my_votes);

// This function sorts from smaller to biggest
my_votes.sort(function(a, b) {
  return a - b;
});

console.log(my_votes);

top_votes = my_votes[my_votes.length - 1];
low_votes = my_votes[0];

// We find the range
console.log("Top votes is:", top_votes);
console.log("Low votes is:", low_votes);

let range = top_votes - low_votes;
let carto_range = 30;
console.log("Data set Range (stats) is:", range);

let bins_size = range/carto_range;
console.log("Bins size:", bins_size)

console.log("Total data points is:", my_votes.length);

let my_votes_for_carto = [];

my_json.features.forEach(function (item) {
  item['properties']['carto_index'] = (item.properties.votos/bins_size) + 10; // add 10 because carto range 10 - 40
});

console.log(my_json.features[0].properties.carto_index);
console.log(my_json.features[100].properties.carto_index);
console.log(my_json.features[169].properties.carto_index);

test_carto_index = []

my_json.features.forEach(function (item) {
  test_carto_index.push(item.properties.carto_index)
  //console.log(item.properties.carto_index);
})

test_carto_index.sort(function(a, b){
  return a - b;
})

//console.log(test_carto_index.slice(70));
fs.writeFile('./carto_indexes.json', JSON.stringify(test_carto_index), function(err){
  if (err) {
    return console.log(err);
  }
  console.log("File was saved :D")
});