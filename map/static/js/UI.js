import * as dom from './dom.js';

const {
  select, infoCandidate, picture, contentIcon,
  ranking, allVotes, number, fill, spinner
} = dom;

const images = [
  {
    name: 'Jorge Ivan Ospina Gomez',
    url: '../static/images/jorge-ospina.jpg'
  },
  {
    name: 'Roberto Ortiz Urena',
    url: '../static/images/roberto-ortiz.jpg'
  },
  {
    name: 'Alvaro Alejandro Eder Garces',
    url: '../static/images/alejandro-eder.jpg'
  },
  {
    name: 'John Michel Maya Bedoya',
    url: '../static/images/michel-maya.jpg'
  },
  {
    name: 'Gustavo Adolfo Prado Cardona',
    url: '../static/images/jorge-ospina.jpg'
  },
  {
    name: 'Francined de Jesus Cano Ramirez',
    url: '../static/images/roberto-ortiz.jpg'
  },
  {
    name: 'Fernando Toloza Colorado',
    url: '../static/images/alejandro-eder.jpg'
  },
  {
    name: 'Danis Antonio Renteria Chala',
    url: '../static/images/michel-maya.jpg'
  },
  {
    name: 'Voto en Blanco ',
    url: '../static/images/roberto-ortiz.jpg'
  },
  {
    name: 'Voto Nulo ',
    url: '../static/images/alejandro-eder.jpg'
  },
  {
    name: 'Voto No Marcado ',
    url: '../static/images/michel-maya.jpg'
  }
];
export default class UI {
  candidateSelect (getJson) {
    getJson.forEach(el => {
      select.innerHTML += `<option data-id="${el.id}" value="${el.nombre}">${el.nombre}</option>`;
    });
  }

  buildInformation (getJson, selected) {
    let totalVotes = 0;
    let totalVotesCandidate = 0;
    let porcentageCandidate = 0;
    let selectCandidate = selected;
    const listCandidate = getJson.sort(this.compare);
    let position = 0;

    if (!selectCandidate) {
      selectCandidate = select.childNodes[1].value;
    }

    listCandidate.forEach((el, indx) => {
      totalVotes += el.votos;
      if (selectCandidate === el.nombre) {
        totalVotesCandidate = el.votos;
        position = indx + 1;
      }
    });

    porcentageCandidate = Math.round((totalVotesCandidate / totalVotes) * 100);

    const isHigh = (accu, value) => accu.votos > value.votos ? accu : value;
    const isLow = (accu, value) => accu.votos < value.votos ? accu : value;

    const resultHight = listCandidate.reduce(isHigh);
    const resultLow = listCandidate.reduce(isLow);

    console.log(resultHight)

    this.removeClass([contentIcon, number, fill]);

    images.forEach((el) => {
      if (el.name === selectCandidate) {
        picture.style.backgroundImage = `url(${el.url})`;
      }
    });

    allVotes.textContent = `Total votes: ${totalVotesCandidate}`;
    number.textContent = `${porcentageCandidate}%`;
    ranking.textContent = `${position} Position`;

    if (resultHight.candidate === selectCandidate) {
      contentIcon.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';

      contentIcon.classList.add('good');
      number.classList.add('good');
      fill.classList.add('good');

      fill.animate([
        { width: '0%', background: '#f44336' },
        { background: '#f44336' },
        { background: '#FDD835' },
        { width: `${porcentageCandidate}%`, background: '#3fbc69' }
      ], {
        duration: 1700,
        delay: 500,
        fill: 'forwards'
      });
    } else if (resultLow.candidate === selectCandidate) {
      contentIcon.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';

      contentIcon.classList.add('bad');
      number.classList.add('bad');
      fill.classList.add('bad');

      fill.animate([
        { width: '0%', background: '#f44336' },
        { width: `${porcentageCandidate}%`, background: '#f44336' }
      ], {
        duration: 1200,
        delay: 500,
        fill: 'forwards'
      });
    } else {
      contentIcon.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>';

      contentIcon.classList.add('medium');
      number.classList.add('medium');
      fill.classList.add('medium');

      fill.animate([
        { width: '0%', background: '#f44336' },
        { width: `${porcentageCandidate}%`, background: '#FDD835' }
      ], {
        duration: 1500,
        delay: 500,
        fill: 'forwards'
      });
    }

    this.tableCompared(listCandidate, totalVotes, selectCandidate);

    infoCandidate.classList.remove('hidden');
    infoCandidate.classList.add('visible');
    spinner.style.display = 'none';
  }

  tableCompared (list, totalVotes, nameCandidate) {
    const contentTable = document.querySelector('.contentTable');
    let selectClass = '';
    const listPorsnt = [];
    contentTable.innerHTML = '<h2>Table comparation</h2>';

    list.forEach((el) => {
      if (nameCandidate === el.nombre) {
        selectClass = 'selectCandidate';
      } else {
        selectClass = '';
      }

      const porcentage = Math.round((el.votos / totalVotes) * 100);
      listPorsnt.push(porcentage);

      contentTable.innerHTML += `
        <div class='stadistic ${selectClass}'>
            <p class='name'>${el.nombre}<span>${porcentage}%</span></p>
            <div class='line'>
                <div class='fill'></div>
            </div>
        </div>`;
    });

    const fill2 = document.querySelectorAll('.line .fill');

    fill2.forEach((el, indx) => {
      el.animate([
        { width: '0%' },
        { width: `${listPorsnt[indx]}%` }
      ], {
        duration: 1500,
        delay: 1500,
        fill: 'forwards'
      });
    });
    contentTable.classList.remove('hidden');
    contentTable.classList.add('visible');
  }

  compare (a, b) {
    //  Use toUpperCase() to ignore character casing
    const bandA = a.votos;
    const bandB = b.votos;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison * -1;
  }

  removeClass (listEl) {
    listEl.forEach((el) => {
      el.classList.remove('good', 'medium', 'bad');
    });
  }
}
