const validFlipbooks = ["15-anniversary", "10-anniversary"];
let flipBook =
  location.search.length === 0
    ? validFlipbooks[0]
    : location.search.substring(1);
if (!validFlipbooks.includes(flipBook)) {
  flipBook = validFlipbooks[0];
}

const flipbookNames = {
  "2021": "NUSH Yearbook 2021",
  "2020": "NUSH Yearbook 2020",
  "15-anniversary": "NUSH 15th Anniversary Book",
  "2019": "NUSH Yearbook 2019",
  "2018": "NUSH Yearbook 2018",
  "10-anniversary": "NUSH 10th Anniversary Book"
}

document.title = flipbookNames[flipBook];

// set the active navlink
$(`#nav-${flipBook}`).addClass("active-nav-link");
const digitalOceanBaseURL = "https://nush-flipbooks.sgp1.cdn.digitaloceanspaces.com"

const options = {
  pdf: `${digitalOceanBaseURL}/${flipBook}.pdf`,
  controlsProps: {
    downloadURL: `${digitalOceanBaseURL}/${flipBook}.pdf`,
  },
  template: {
    html: "./assets/templates/default-book-view.html",
    styles: ["./assets/templates/black-book-view.css"],
    sounds: {
      startFlip: "./assets/sounds/start-flip.mp3",
      endFlip: "./assets/sounds/end-flip.mp3",
    },
    links: [
      {
        rel: "stylesheet",
        href: "./assets/css/fontawesome.min.css",
      },
      {
        rel: "stylesheet",
        href: "./assets/css/solid.min.css",
      },
    ],
    script: "./assets/templates/default-book-view.js",
  },
};

const book = $("#flipbook").FlipBook(options);

var home = () => {
  book.ctrl.goToPage(2);
};
