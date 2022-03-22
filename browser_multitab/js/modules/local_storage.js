// key for the syncronized resource for storing in local storage
export const localStorageKey = "SharedData";

// Clear local storage and add initial value of shared counter into it
export function ClearLocalStorage() {
  localStorage.clear();
}

// Post message to the storage
export function PostMessage(message) {
  var previousValue = localStorage.getItem(window.localStorageKey);

  if (message == previousValue) {
    alert("Value being saved to local storage has't changed, event recepients won't be notified.");
  }

  console.log("PostMessage: " + message);
  // save to the local storage for further accessing from another browsing contexts.
  localStorage.setItem(window.localStorageKey, message);
}

// Subscribe to the storage event
export function ListenToStorage(processMessageCallback) {
  console.log("ListenToStorage ");
  window.addEventListener("storage", (event) => processMessageCallback(event.newValue, "Local storage"));
}

export function GetStorageValue() {
  return localStorage.getItem(window.localStorageKey);
}
