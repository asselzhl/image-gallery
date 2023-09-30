import '../scss/style.scss';

const accessKey = 'aTY8Dorni987_v2alVfGkklQTVAuCGTYKQlDITp_NIE';
 
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search__input');


const listOfPhotosUrl = `https://api.unsplash.com/photos?per_page=20&client_id=${accessKey}`;

let currentImage = 0;
let allImages;

async function getImages() {
  removeImages();
  let url = listOfPhotosUrl;
  const res = await fetch(url);
  const data = await res.json();
  allImages = data;
  createImages(allImages);
}
getImages();

async function searchImages() {
  removeImages();
  let query = searchInput.value;
  let url = `https://api.unsplash.com/search/photos?query=${query}&per_page=21&client_id=${accessKey}`;;
  const res = await fetch(url);
  const data = await res.json();
  allImages = data.results;
  createImages(allImages);
}

searchInput.addEventListener('change', () => {
  if (searchInput.value == '') {
    getImages();
  } else {
    searchImages();
  }
});

function createImages (data) {
  data.forEach((item, index) => {
    let img = document.createElement('img');
    img.src = item.urls.regular;
    img.classList.add('gallery-img');
    gallery.appendChild(img);

    img.addEventListener('click', () => {
      currentImage = index;
      showPopup(item);
    })
  })
}

function removeImages () {
    while (gallery.hasChildNodes()) {
      gallery.removeChild(gallery.firstChild);
    }
}



function showPopup (item) {
  let modal = document.querySelector('.modal');
  const downloadButton = document.querySelector('.download__button');
  const closeButton = document.querySelector('.close__button');
  const image = document.querySelector('.opened__image');

  modal.classList.remove('hide');
  image.src = item.urls.regular;
  downloadButton.href = item.links.download;

  closeButton.addEventListener('click', () => {
    modal.classList.add('hide');
  })
}
