const options = {
  pdf: "./assets/Yearbook 2019 (Web).pdf",
  template: {
    html: './assets/templates/default-book-view.html',
    styles: [
      './assets/templates/black-book-view.css'
    ],
    links: [{
      rel: 'stylesheet',
      href: './node_modules/font-awesome/css/font-awesome.css'
    }],
    script: './assets/templates/default-book-view.js',
  }
};

const book = $("#flipbook").FlipBook(options);
