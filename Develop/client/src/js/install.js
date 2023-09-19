const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default browser prompt for installing the app
  event.preventDefault();

  // Store the event to use it later
  deferredPrompt = event;

  // Enable the "Install" button to allow the user to trigger installation
  butInstall.removeAttribute("disabled");
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Show the browser's installation prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the installation prompt");
    } else {
      console.log("User dismissed the installation prompt");
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Disable the "Install" button after installation
    butInstall.setAttribute("disabled", true);
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App installed successfully");
});
