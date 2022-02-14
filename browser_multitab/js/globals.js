// key for the syncronized resource for storing in local storage
const sharedCounterKey = "SharedCounter";
console.log("set shared counter key");

// Add listener for the storage update event
function listenStorage() {
  window.addEventListener("storage", (event) => UpdateSharedCounter);
}

// Get value from the storage and update the label
function UpdateSharedCounter() {
  // get shared resource from local storage and show in the label
  document.getElementById("SharedCounter").innerHTML = localStorage.getItem(
    window.sharedCounterKey
  );
}

// Set value of the label to the specified value
function SetSharedCounterLabel(newValue) {
  document.getElementById("SharedCounter").innerHTML = newValue;
}

// Handle increment button click
function OnIncrementButtonClick(event) {
  var newValue = parseInt(localStorage.getItem(window.sharedCounterKey)) + 1;
  localStorage.setItem(window.sharedCounterKey, newValue);
  SetSharedCounterLabel(newValue);
}

// Handle decrement button click
function OnDecrementButtonClick(event) {
  var newValue = parseInt(localStorage.getItem(window.sharedCounterKey)) - 1;
  localStorage.setItem(window.sharedCounterKey, newValue);
  SetSharedCounterLabel(newValue);
}
