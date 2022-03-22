export function PostMessage(message) {
  console.log("Post message to service worker");
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}
