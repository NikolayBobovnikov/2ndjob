self.addEventListener("install", (event) => {
    console.log("Setup");
});

self.addEventListener("activate", (event) => {
    console.log("Activated");
});

self.addEventListener("fetch", (event) => {
    console.log("Fetching from the server");
});