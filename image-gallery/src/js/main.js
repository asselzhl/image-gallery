import '../scss/style.scss';

const accessKey = 'aTY8Dorni987_v2alVfGkklQTVAuCGTYKQlDITp_NIE';
 
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search__input');
const modal = document.querySelector('.modal');
const downloadButton = document.querySelector('.download__button');
const closeButton = document.querySelector('.close__button');
const openedImage = document.querySelector('.opened__image');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const popup = document.querySelector('.popup-window');

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
  nextButton.addEventListener('click', () => {
    if (currentImage == data.length) {
      return;
    } else {
      currentImage++;
      openedImage.src = data[currentImage].urls.regular;
      downloadButton.href = data[currentImage].links.download;
    }
  })
  prevButton.addEventListener('click', () => {
    if (currentImage == 0) {
      return;
    } else {
      currentImage--;
      openedImage.src = data[currentImage].urls.regular;
      downloadButton.href = data[currentImage].links.download;
    }
  })
}

function removeImages () {
    while (gallery.hasChildNodes()) {
      gallery.removeChild(gallery.firstChild);
    }
}




function showPopup (item) {
  modal.classList.remove('hide');
  openedImage.src = item.urls.regular;
  downloadButton.href = item.links.download;

  closeButton.addEventListener('click', () => {
    modal.classList.add('hide');
  })
  modal.addEventListener('click', (e) => {
    if(e.target == modal) {
      modal.classList.add('hide');
    } else {
      return;
    }
  })
}






