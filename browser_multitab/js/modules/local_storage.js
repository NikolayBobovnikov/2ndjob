// key for the syncronized resource for storing in local storage
export const sharedDataKey = "SharedData";

// Clear local storage and add initial value of shared counter into it
export function ClearLocalStorage() {
    localStorage.clear();
}

// Post message to the storage
export function PostMessage(message) {
    // save to the local storage for further accessing from another browsing contexts.
    localStorage.setItem(window.sharedDataKey, message);
}

// Subscribe to the storage event
export function ListenToStorage(processMessageCallback) {
    window.addEventListener("storage", (event) => processMessageCallback(event.newValue, event.type));
}

export function GetStorageValue() {
    return localStorage.getItem(window.sharedDataKey);
}