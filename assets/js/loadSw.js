if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {scope: './'}).then(reg => {
    console.log('Registration succeeded. Scope is ' + reg.scope);
  })
} else {
  console.log("Service worker not available.");
}
