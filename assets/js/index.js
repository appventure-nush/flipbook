const validFlipbooks = ["2020", "2019", "2018"]
let flipBook = location.search.length === 0 ? validFlipbooks[0] : location.search.substring(1);
if (!validFlipbooks.includes(flipBook)) {
  flipBook = validFlipbooks[0];
}

document.title = `NUSH Year Book ${flipBook}`;

const options = {
  pdf: `./assets/Yearbook-${flipBook}.pdf`,
  controlsProps: {
    downloadURL: `./assets/Yearbook-${flipBook}.pdf`
  },
  template: {
    html: './assets/templates/default-book-view.html',
    styles: [
      './assets/templates/black-book-view.css'
    ],
    sounds: {
      startFlip: './assets/sounds/start-flip.mp3',
      endFlip: './assets/sounds/end-flip.mp3'
    },
    links: [{
      rel: 'stylesheet',
      href: './node_modules/font-awesome/css/font-awesome.css'
    }],
    script: './assets/templates/default-book-view.js',
  }
};

const book = $("#flipbook").FlipBook(options);

var home = () => {
  book.ctrl.goToPage(2)
}

