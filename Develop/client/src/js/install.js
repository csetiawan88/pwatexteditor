const butInstall = document.getElementById("buttonInstall");

// // Logic for installing the PWA
// let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default browser prompt for installing the app
  //event.preventDefault();

  // Store the event to use it later
  window.deferredPrompt = event;

  // Enable the "Install" button to allow the user to trigger installation
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App installed successfully");
  // Clear prompt
  window.deferredPrompt = null;
});
