document.addEventListener('DOMContentLoaded', () => { 

    const overlay = document.querySelector('.overlay');
    const btnMenu = document.querySelector('.btn-menu');
    const header = document.querySelector('header');

    if(document.getElementById('textHead')){
        const textHead = document.getElementById('textHead');
        const mapGif = document.getElementById('mapGif');
        
        textHead.classList.add('fadeUp');
        mapGif.classList.add('fadeDown');
    }

    function viewMenu () {
        header.classList.add('visible');
        overlay.classList.add('visible');
      }
    function hideMenu () {
        header.classList.remove('visible');
        overlay.classList.remove('visible');
      }
    
      btnMenu.onclick = () => { viewMenu(); };
      overlay.onclick = () => { hideMenu(); };
})

