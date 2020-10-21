import UI from './UI.js';
import * as dom from './dom.js';
import { com } from './Comunas.js';
import { Barrios } from './Barrios.js';

const {
  tableComparate, infoCandidate, spinner, hanlder, overlay,
  btnMenu, select
} = dom;

let num = 1;
const URL = '../static/js/votosTotales.json';
// const init_url = 'http://0.0.0.0:5005/api/v1/candidates_all';
const init_url_map = 'http://34.75.248.42/api/v1/2'
const URL_PLACES = 'http://34.75.248.42/api/v1/';
let {layer, layer2, layer3, layer4} = {};

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

  getData(init_url_map)
  .then(data => {
  console.log(data);
  const sourcePlace = new carto.source.GeoJSON(data);
  const vizPlace = new carto.Viz(`
    @nombre_puesto: $nombre_puesto  
    @votos: $votos
    @style: ramp(linear($votos,1,10),[blue, turquoise, #FC4E2A, #FFFFB2, #FEB24C, #FD8D3C, #B10026])
    width: 10
    color: opacity(@style, 0.8)
    strokeWidth: 0.5
    strokeColor: opacity(@style, 0.4)
  `);
  layer2 = new carto.Layer(`puestos`, sourcePlace, vizPlace);
  layer2.addTo(map);
  createInteractivity(layer2, map);
  })
  .then(() => {
    getData(URL)
    .then(data => {
      console.log(data);
      const ui = new UI();
      data = data.sort(ui.compare);
      ui.candidateSelect(data);
      ui.buildInformation(data, '');
      createLayers();
    })
  })

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
    layer2.hide();
    num++;

    //get data for map
    getData(urlFinal)
    .then(data => {
      layer2= printMap(data, map, num, layer2);
      layer2.addTo(map);
    })
    
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
  document.querySelector('#contComunaVotos').addEventListener('click', function() {
    if(document.querySelector('#ComunaVotos').checked) {
      layer4.addTo(map);
      console.log('checked');
     }else{
      console.log('nothing');
      layer4.remove();
     }
  });
  document.querySelector('#contCandidate').addEventListener('click', function () {
    
    if(document.querySelector('#candidate').checked) {
      layer2.addTo(map);
      layer2.show();
      createInteractivity(layer2, map);
      console.log('checked');
    }else{
      console.log('nothing');
      layer2.hide();
      layer2.remove();
    }
  });
  
}

function printMap (data, map, num, layerplace) {
  const sourcePlace = new carto.source.GeoJSON(data);
  const vizPlace = new carto.Viz(`
    @nombre_puesto: $nombre_puesto  
    @votos: $votos
    @style: ramp(linear($votos,1,10),[blue, turquoise, #FC4E2A, #FFFFB2, #FEB24C, #FD8D3C, #B10026])
    width: @votos/20
    color: opacity(@style, 0.8)
    strokeWidth: 0.5
    strokeColor: opacity(@style, 0.4)
  `);
  layerplace = new carto.Layer(`puestos${num}`, sourcePlace, vizPlace);
  layerplace.addTo(map);

  createInteractivity(layerplace, map);
  
  return layerplace;
}

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

  const sourceCominaCloro = new carto.source.GeoJSON(com);
  const vizCominaCloro = new carto.Viz(`
    strokeColor: black
    @style: ramp(linear($comuna,10),[#FC4E2A, #FFFFB2, #FEB24C, #FD8D3C, #B10026])
    color: opacity(@style, 0.5)
    `);
  layer4 = new carto.Layer('ComunaVotos', sourceCominaCloro, vizCominaCloro);

}

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
                <h3 class ="h4">votos por punto de votacion: </h3>
                <h3 class ="open-sans">Lugar de votación: <br>${feature.variables.nombre_puesto.value}</h3>
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

async function getData(url) {
  const response = await fetch(url);
  const date = await response.json()
  return date;
}

