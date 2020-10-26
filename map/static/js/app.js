import UI from './UI.js';
import * as dom from './dom.js';
import { com } from './Comunas.js';
import { Barrios } from './Barrios.js';

const {
  tableComparate, infoCandidate, spinner, hanlder, overlay,
  btnMenu, select
} = dom;

let num = 0, numComun = 1;
const URL = '../static/js/votosTotales.json';
// const init_url = 'http://0.0.0.0:5005/api/v1/candidates_all';
const URL_PLACES = 'http://0.0.0.0:6005/api/v1/'/*'https://opendemocracy.digital/api/v1/'*/;
let {layer, layer2, layer3, layer4} = {};
let chekedPlace = true;
let chekedComuna = false;
let new_data; // Here we store return from the normalization functions.

document.addEventListener('DOMContentLoaded', () => {

  const map = new mapboxgl.Map({
    container: 'map',
    style: carto.basemaps.positron,
    center: [-76.5320, 3.4516],
    zoom: 11
  });
  
  init(map);
 
  hanlder.onclick = () => { dom.viewInfo(); };
  btnMenu.onclick = () => { dom.viewMenu(); };
  overlay.onclick = () => { dom.hideMenu(); };

});

function init (map) {
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');

  const client = carto.setDefaultAuth({
    username: 'cartovl',
    apiKey: 'default_public'
  });

  const s = carto.expressions;
  
  // Below the HTML is constructed to reflect the candidates
  // position in function of their votes.
  // getData() function fetches any argument it is inputed. 
  getData(URL)
  .then(data => {
   
    const ui = new UI(); // User interface Class connected with HTML handlers
    data = data.sort(ui.compare);
    ui.candidateSelect(data);
    ui.buildInformation(data, '');
    createLayers(map);

    const id = select.options[select.selectedIndex].getAttribute('data-id')
    return id;
  })
  .then((id) => {
    // The API is consulted with the candidate_id to fetch 
    // a dictionary with point coordinates, candidate name
    // and number of votes, between other data.  
    const urlFinal = `${URL_PLACES}${id}`;
    getData(urlFinal)
    .then(data => {
    new_data = normalizeData(data);
    
    // This call is for the page first load
    const sourcePlace = new carto.source.GeoJSON(new_data);
    const vizPlace = new carto.Viz(`
      @nombre_puesto: $nombre_puesto  
      @votos: $votos
      @style: ramp(linear($votos,$carto_index_low,$carto_index_high),[#311B92, #f35a27])
      color: opacity(@style, 0.9)
      width: $carto_index
      strokeWidth: 0.5
      strokeColor: opacity(@style, 0.4)
    `);
    layer2 = new carto.Layer(`puestos`, sourcePlace, vizPlace);
    layer2.addTo(map);
    createInteractivity(layer2, map);
    })

  })
  // Each time a different candidate is selected map needs to be recharged
  select.addEventListener('change', function () {

    const candidate = select.options[select.selectedIndex].value;
    const id = select.options[select.selectedIndex].getAttribute('data-id')
    tableComparate.classList.add('hidden');
    infoCandidate.classList.add('hidden');
    spinner.style.display = 'block';
    const urlFinal = `${URL_PLACES}${id}`;
  
    // get data for panel
    getData(URL)
    .then(data => {
      const ui = new UI();
      ui.buildInformation(data, candidate);
    })
    //get data for map
    getData(urlFinal)
    .then(data => {
      if (chekedPlace){
        new_data = normalizeData(data)
        num++;
        console.log(`init puestos${num}`)
        layer2 = printMap(new_data, map, num, layer2);
        layer2.addTo(map);
      }
    })
    if (chekedComuna) {
      const id = select.options[select.selectedIndex].getAttribute('data-id');
      const urlComunas = `https://opendemocracy.digital/api/v1/resultado/comunas/${id}`;
      const temp = `http://0.0.0.0:6005/api/v1/resultado/comunas/${id}`;
      getData(temp)
      .then(data => {
        new_data = normalizeDataCloropleth(data);
        layer4.hide();
        layer4.remove();
        layer4 = printMapComunasVotes(new_data, map, numComun, layer4);
        numComun++;
        layer4.addTo(map);
        layer4.show();
      })
    }
    
  });

  document.querySelector('#contComunas').addEventListener('click', function() {
    if(document.querySelector('#comunas').checked) {
      layer.addTo(map);
      console.log('checked');
     }else{
      console.log('nothing');
      layer.remove();
     }
  });
  document.querySelector('#contNeighborhood').addEventListener('click', function() {
    if(document.querySelector('#Neighborhood').checked) {
      layer3.addTo(map);
      console.log('checked');
     }else{
      console.log('nothing');
      layer3.remove();
     }
  }); 
  document.querySelector('#ComunaVotos').addEventListener('click', function() {
    
    if(document.querySelector('#ComunaVotos').checked) {  
      console.log('checked');
      const id = select.options[select.selectedIndex].getAttribute('data-id')
      const urlComunas = `https://opendemocracy.digital/api/v1/resultado/comunas/${id}`
      const temp = `http://0.0.0.0:6005/api/v1/resultado/comunas/${id}`;
      getData(temp)
      .then(data => {
        numComun++;
        new_data = normalizeDataCloropleth(data)
        layer4 = printMapComunasVotes(new_data, map, numComun, layer4);
        layer4.addTo(map);
        layer4.show();
      })
      chekedComuna = true;
     }else{
      console.log('nothing');
      layer4.hide();
      layer4.remove();
      chekedComuna = false;
     }
  });
  document.querySelector('#contCandidate').addEventListener('click', function () {
    
    if(document.querySelector('#candidate').checked) {
      layer2.addTo(map);
      layer2.show();
      chekedPlace = true;
      console.log('checked');
    }else{
      console.log('nothing');
      layer2.hide();
      layer2.remove();
      chekedPlace = false;
    }
  });
}

/*

================================================
            Functions definitions
================================================
- printMap
- printMapComunasVotes
- createLayers
- createInteractivity
- createInteractivityComuna
- normalizeData
- normalizeDataCloropleth

*/

function printMap (data, map, num, layerplace) {
  layerplace.hide();
  const sourcePlace = new carto.source.GeoJSON(data);
  const vizPlace = new carto.Viz(`
    @nombre_puesto: $nombre_puesto  
    @votos: $votos
    @style: ramp(linear($votos,1,2500),[#311B92, #f35a27])
    width: 10
    color: opacity(@style, 0.9)
    strokeWidth: 0.5
    strokeColor: opacity(@style, 0.4)
  `);
  console.log(`puestos${num}`)
  layerplace = new carto.Layer(`puestos${num}`, sourcePlace, vizPlace);
  
  createInteractivity(layerplace, map);
  
  return layerplace;
};

// Sends Comunas data to carto for Cloropleth graphics

/* @style: ramp(linear(actual votes_min, vote_max), [colors, colors, colors])
*/
function printMapComunasVotes (data, map, num, layerplace) {
  
  const sourceCominaCloro = new carto.source.GeoJSON(data);
    const vizCominaCloro = new carto.Viz(`
      @nombre: $nombre
      @votos: $votos
      @comuna: $comuna
      strokeColor: black
      width: 20
      @style: ramp(linear($votos,$carto_index_low,$carto_index_high),[#221f59, #f35a27, #FFB300])
      color: opacity(@style, 0.8)
      `);
    layerplace = new carto.Layer(`ComunaVotos${num}`, sourceCominaCloro, vizCominaCloro);
  
  createInteractivityComuna(layerplace, map);
  
  return layerplace;
};

function createLayers() {
  const source1 = new carto.source.GeoJSON(com);
  const viz = new carto.Viz(`
   color: opacity(yellow, 0.2)
   strokeColor: black
   style: ramp(linear($votos,10),[#FC4E2A, #FFFFB2, #FEB24C, #FD8D3C, #B10026])
  `);
  layer = new carto.Layer('comunas', source1, viz);

  const sourceBarrios = new carto.source.GeoJSON(Barrios);
  const vizBarrios = new carto.Viz(`
    width: 5
    color: opacity(blue, 0.02)
    strokeWidth: 1
    strokeColor: black
  `);
  layer3 = new carto.Layer('barrios', sourceBarrios, vizBarrios);

};

function createInteractivity(layer, map){
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
  
  const interactivity = new carto.Interactivity([layer]);
  interactivity.on('featureEnter', featureEvent => {
    
    const feature = featureEvent.features[0];
    if (!feature) {
      return;
    }
    const coords = featureEvent.coordinates;
    const html = `
              <div id='popUp'>
                <h3 class ="h4">votos por comuna: </h3>
                <h3 class ="open-sans">${feature.variables.nombre_puesto.value}</h3>
                <p class="description open-sans">votos obtenidos: <br> ${feature.variables.votos.value}</h3>
            </div>
            `;
    popup.setLngLat([coords.lng, coords.lat]);
    popup.setHTML(html)
    popup.addTo(map);
  
  });
   
  interactivity.on('featureLeave', () => {
    popup.remove();
  })
}

function createInteractivityComuna(layer, map){
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
  const interactivity = new carto.Interactivity([layer]);
  interactivity.on('featureEnter', featureEvent => {

  const feature = featureEvent.features[0];
  if (!feature) {
    return;
  }
  const coords = featureEvent.coordinates;
  const html = `
                <div id='popUp'>
                  <h3 class ="h4">votos por Comuna: </h3>
                  <h3 class ="open-sans">Comuna: <br>${feature.variables.comuna.value}</h3>
                  <p class="description open-sans">votos obtenidos: ${feature.variables.votos.value}</h3>
              </div>
              `;
              
  popup.setLngLat([coords.lng, coords.lat]);
  popup.setHTML(html)
  popup.addTo(map);
    
  });   
  interactivity.on('featureLeave', () => {
    popup.remove();
  })
}

async function getData(url) {
  const response = await fetch(url, {
    'mode': 'cors',
    'method': 'GET',
    'headers': {
      'Origin': 'http://184.72.156.146'
    }
  });
  const date = await response.json()
  return date;
}

/*
normalizeData(data)
Function to insert in each puesto property a key 'carto_index'
with a index value between 10 and 40 that represents its weight
to be the point size in Carto
*/

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

/*
normalizeDataCloropleth(data)
Function to insert in the general GeoJson a key 'metadata'
with two keys 'carto_index_[high | low] to be passed as 
limits to the Comunas Cloropleth for Carto.
*/

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