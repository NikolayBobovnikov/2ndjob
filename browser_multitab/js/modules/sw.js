self.addEventListener("install", (event) => {
    console.log("Setup");
});

self.addEventListener("activate", (event) => {
    console.log("Activated");
});

self.addEventListener("message", (event) => {
    console.log("message received: ");
    console.log(event);
});