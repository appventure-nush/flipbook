const validFlipbooks = ["20-anniversary", "15-anniversary", "10-anniversary", 
  "convo2026"
];
let flipBook =
  location.search.length === 0
    ? validFlipbooks[0]
    : location.search.substring(1);
if (!validFlipbooks.includes(flipBook)) {
  flipBook = validFlipbooks[0];
}

const flipbookNames = {
  "convo2026": "2026 NUSH Convocation Book", 
  "20-anniversary": "NUSH 20th Anniversary Book",
  "15-anniversary": "NUSH 15th Anniversary Book",
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
    actions: {
      cmdSinglePage: {
        active: false, 
        activeForMobile: false
      }
    }
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

const fullscreenButton = document.querySelector("#fullscreen-button");
const fullscreenTarget = document.querySelector(".main");
const fullscreenRequest =
  fullscreenTarget.requestFullscreen ||
  fullscreenTarget.webkitRequestFullscreen ||
  fullscreenTarget.msRequestFullscreen;
const fullscreenExit =
  document.exitFullscreen ||
  document.webkitExitFullscreen ||
  document.msExitFullscreen;
const supportsFullscreen =
  typeof fullscreenRequest === "function" &&
  typeof fullscreenExit === "function";

const getFullscreenElement = () =>
  document.fullscreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement;

const updateFullscreenButton = () => {
  const isFullscreen = Boolean(getFullscreenElement());
  fullscreenButton.textContent = isFullscreen ? "Exit full screen" : "Full screen";
  fullscreenButton.setAttribute(
    "aria-label",
    isFullscreen ? "Exit full screen" : "Enter full screen",
  );
  fullscreenButton.setAttribute("aria-pressed", String(isFullscreen));
};

const requestFullscreen = () => {
  const result = fullscreenRequest.call(fullscreenTarget);
  if (result && typeof result.catch === "function") {
    result.catch((error) => {
      console.error("Unable to enter fullscreen mode.", error);
    });
  }
};

const exitFullscreen = () => {
  const result = fullscreenExit.call(document);
  if (result && typeof result.catch === "function") {
    result.catch((error) => {
      console.error("Unable to exit fullscreen mode.", error);
    });
  }
};

if (supportsFullscreen) {
  fullscreenButton.classList.add("supported");
  fullscreenButton.addEventListener("click", () => {
    if (getFullscreenElement()) {
      exitFullscreen();
    } else {
      requestFullscreen();
    }
  });

  ["fullscreenchange", "webkitfullscreenchange", "MSFullscreenChange"].forEach(
    (eventName) => {
      document.addEventListener(eventName, updateFullscreenButton);
    },
  );
  updateFullscreenButton();
}
