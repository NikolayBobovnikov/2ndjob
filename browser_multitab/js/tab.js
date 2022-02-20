import * as ls from "./modules/local_storage.js";
import * as bc from "./modules/broadcast_channel.js";

document.addEventListener("DOMContentLoaded", OnContentLoad);
document.getElementById("IncrementButton").addEventListener("click", ls.OnIncrementButtonClick);
document.getElementById("DecrementButton").addEventListener("click", ls.OnDecrementButtonClick);
document.getElementById("BroadcastChannelButton").addEventListener("click", OnBroadcastChannelButtonClick);

const broadcastChannel = bc.SubscribeToChannel();

// Update label on content
function OnContentLoad(event) {
  ls.UpdateSharedCounter();
  // subscribe tab window to the storage event
  ls.listenStorage();

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
