// Get a reference to the button element with the id "buttonInstall"
const butInstall = document.getElementById("buttonInstall");

// // Logic for installing the Progressive Web App (PWA)

// This variable will be used to store the "beforeinstallprompt" event
let deferredPrompt;

// TODO: Add an event handler for the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default browser prompt for installing the app
  // event.preventDefault();

  // Store the "beforeinstallprompt" event in the deferredPrompt variable
  window.deferredPrompt = event;

  // Make the install button visible
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler for the "butInstall" button
butInstall.addEventListener("click", async () => {
  // Retrieve the "beforeinstallprompt" event from the deferredPrompt variable
  const promptEvent = window.deferredPrompt;

  // Check if the promptEvent is available
  if (!promptEvent) {
    return;
  }

  // Show the installation prompt to the user
  promptEvent.prompt();

  // Reset the deferredPrompt variable
  window.deferredPrompt = null;

  // Hide the install button after the user interacts with the prompt
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an event handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // Log a message when the app is successfully installed
  console.log("App installed successfully");

  // Reset the deferredPrompt variable
  window.deferredPrompt = null;
});
