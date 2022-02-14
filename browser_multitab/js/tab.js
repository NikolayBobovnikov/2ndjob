document.addEventListener("DOMContentLoaded", OnContentLoad);
document
  .getElementById("IncrementButton")
  .addEventListener("click", OnIncrementButtonClick);
document
  .getElementById("DecrementButton")
  .addEventListener("click", OnDecrementButtonClick);

// subscribe tab window to the storage event
listenStorage();

// Update label on content
function OnContentLoad(event) {
  UpdateSharedCounter();
}
