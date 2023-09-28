import '../scss/style.scss';

const searchInput = document.querySelector('.input');
const galleryContainer = document.querySelector('.gallery__container');
const images = document.querySelectorAll('.gallery__image');
const inputDiv = document.querySelector('.header__input');


let query;
let url; 
searchInput.addEventListener('change', () => {
  removeImg();
  if (searchInput.value == '') {
    url = 'https://api.unsplash.com/photos?per_page=21&orientation=landscape&client_id=aTY8Dorni987_v2alVfGkklQTVAuCGTYKQlDITp_NIE';
  } else {
    query = searchInput.value;
    url = `https://api.unsplash.com/search/photos?query=${query}&per_page=21&orientation=landscape&client_id=aTY8Dorni987_v2alVfGkklQTVAuCGTYKQlDITp_NIE`;
  }
  getData();
})



async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  createImg(data);
}


function createImg (data) {
  if (Array.isArray(data)) {
    data.forEach((image,index) => {
      const img = document.createElement('div');
      img.classList.add('gallery__image');
      img.style.backgroundImage = `url(${image.urls.regular})`;
      galleryContainer.append(img);
    })
  } else {
    data.results.forEach((image, index) => {
      const img = document.createElement('div');
      img.classList.add('gallery__image');
      img.style.backgroundImage = `url(${image.urls.regular})`;
      galleryContainer.append(img);
    });
  }
}

function removeImg () {
  while (galleryContainer.hasChildNodes()) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }
}

window.addEventListener('load', (e) => {
  url = 'https://api.unsplash.com/photos?per_page=21&orientation=landscape&client_id=aTY8Dorni987_v2alVfGkklQTVAuCGTYKQlDITp_NIE';
  getData();
})