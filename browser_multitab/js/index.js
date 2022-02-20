import * as ls from "./modules/local_storage.js";
import * as bc from "./modules/broadcast_channel.js";

document.addEventListener("DOMContentLoaded", OnContentLoad);
document.getElementById("BroadcastChannelButton").addEventListener("click", OnBroadcastChannelButtonClick);
const broadcastChannel = bc.SubscribeToChannel();

function OnCreateTabButtonClick(event) {
  window.open("tab.html", "_blank");
}

function OnContentLoad(event) {
  document.getElementById("IncrementButton").addEventListener("click", ls.OnIncrementButtonClick);
  document.getElementById("DecrementButton").addEventListener("click", ls.OnDecrementButtonClick);
  document.getElementById("CreateTabButton").addEventListener("click", OnCreateTabButtonClick);

  ls.listenStorage();
  ls.initializeLocalStorage();

  bc.ListenToBroadcastChannel(broadcastChannel, OnBroadcastChannelMessageReceived);
}

function OnBroadcastChannelButtonClick() {
  var element = document.getElementById("BroadcastChannelData");
  var message = element.value;
  bc.BroadcastMessage(broadcastChannel, message);
}

function OnBroadcastChannelMessageReceived(event) {
  console.log("OnBroadcastChannelReceiveMessage event: " + event);
  var element = document.getElementById("BroadcastChannelDataLabel");
  element.textContent = event.data;
}
