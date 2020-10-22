import UI from './UI.js';

export const tableComparate = document.querySelector('.contentTable');
export const infoCandidate = document.querySelector('.infoCandidate');
export const spinner = document.querySelector('.sk-fading-circle');
export const hanlder = document.querySelector('.handler');
export const overlay = document.querySelector('.overlay');
export const btnMenu = document.querySelector('.btn-menu');
export const panelInfo = document.querySelector('.panelInfo');
export const header = document.querySelector('header');
export const select = document.getElementById('listCandidate');
export const picture = document.querySelector('.picture');
export const contentIcon = document.querySelector('.contentIcon');
export const ranking = document.querySelector('.ranking');
export const allVotes = document.querySelector('.allVotes');
export const number = document.querySelector('.number');
export const fill = document.querySelector('.bar .fill');
// Elementos del checkbox del mapa

let toogle = true;

export function urlFinal (select) {
  let canditateUrl = (select.options[select.selectedIndex].value).split(' ').join('_');
  canditateUrl = canditateUrl.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (canditateUrl);
}

export function allVotesbyCandidate (url, candidate = '') {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const ui = new UI();
      if (!candidate) {
        ui.candidateSelect(data);
      }
      ui.buildInformation(data, candidate);
    });
}

export function viewInfo () {
  if (toogle) {
    panelInfo.classList.add('up');
    toogle = !toogle;
  } else {
    panelInfo.classList.remove('up');
    toogle = !toogle;
  }
}
export function viewMenu () {
  header.classList.add('visible');
  overlay.classList.add('visible');
}
export function hideMenu () {
  header.classList.remove('visible');
  overlay.classList.remove('visible');
}

