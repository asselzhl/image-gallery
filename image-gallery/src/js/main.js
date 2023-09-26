import '../scss/style.scss';

const searchInput = document.querySelector('.input');
const galleryContainer = document.querySelector('.gallery__container');
const images = document.querySelectorAll('.gallery__image');

let query;
let url; 
searchInput.addEventListener('change', () => {
  removeImages();
  query = searchInput.value;
  url = `https://api.unsplash.com/search/photos?query=${query}&client_id=aTY8Dorni987_v2alVfGkklQTVAuCGTYKQlDITp_NIE`;
  getData();
})
 

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  createImg(data);
}


function createImg (data) {
  data.results.forEach((image, index) => {
    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = image.urls.regular;
    img.alt = `image${index}`;
    galleryContainer.append(img);
  });
}
function removeImages () {
  while (galleryContainer.hasChildNodes()) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }
}

