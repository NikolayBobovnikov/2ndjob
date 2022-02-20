// key for the syncronized resource for storing in local storage
export const sharedCounterKey = "SharedCounter";

// Add listener for the storage update event
export function listenStorage() {
  window.addEventListener("storage", (event) => UpdateSharedCounter);
}

// Get value from the storage and update the label
export function UpdateSharedCounter() {
  // get shared resource from local storage and show in the label
  document.getElementById("SharedCounter").innerHTML = localStorage.getItem(
    window.sharedCounterKey
  );
}

// Set value of the label to the specified value
export function SetSharedCounterLabel(newValue) {
  document.getElementById("SharedCounter").innerHTML = newValue;
}

// Handle increment button click
export function OnIncrementButtonClick(event) {
  var newValue = parseInt(localStorage.getItem(window.sharedCounterKey)) + 1;
  localStorage.setItem(window.sharedCounterKey, newValue);
  SetSharedCounterLabel(newValue);
}

// Handle decrement button click
export function OnDecrementButtonClick(event) {
  var newValue = parseInt(localStorage.getItem(window.sharedCounterKey)) - 1;
  localStorage.setItem(window.sharedCounterKey, newValue);
  SetSharedCounterLabel(newValue);
}

// Clear local storage and add initial value of shared counter into it
export function initializeLocalStorage() {
  // key for the syncronized resource for storing in local storage
  // reset local storage on reloading index page
  localStorage.clear();

  // initialize shared resource
  let initialValue = 0;

  // save to the local storage for further accessing from another browsing contexts.
  localStorage.setItem(window.sharedCounterKey, initialValue);

  // show value on the index page
  document.getElementById("SharedCounter").innerHTML = initialValue;
}
