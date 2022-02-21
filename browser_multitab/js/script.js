import * as ls from "./modules/local_storage.js";
import * as bc from "./modules/broadcast_channel.js";

document.addEventListener("DOMContentLoaded", OnContentLoad);

function OnContentLoad(event) {
    var page = window.location.pathname.split("/").pop();

    // add handler to create tab button click for main page
    if (page == "index.html") {
        document.getElementById("CreateTabButton").addEventListener("click", OnCreateTabButtonClick);
    }

    // subscribe to shared data update events in all browsing contexts
    document.getElementById("BroadcastChannelButton").addEventListener("click", OnBroadcastChannelButtonClick);
    document.getElementById("LocalStorageButton").addEventListener("click", OnLocalStorageButtonClick);

    // setup local storage
    ls.ListenToStorage(OnLocalStorageUpdated);
    ls.ClearLocalStorage();

    // setup broadcast channel
    window.broadcastChannel = bc.SubscribeToChannel();
    bc.ListenToBroadcastChannel(broadcastChannel, OnBroadcastChannelMessageReceived);
}

function OnCreateTabButtonClick(event) {
    window.open("tab.html", "_blank");
}

function OnLocalStorageButtonClick(event) {
    console.log("OnLocalStorageButtonClick");
    console.log(event);
    var element = document.getElementById("LocalStorageData");
    console.log(element);
    ls.PostMessage(element.value);
}

function OnLocalStorageUpdated(event) {
    console.log("OnLocalStorageUpdated");
    console.log(event);
    var element = document.getElementById("DataLabel");
    var value = ls.GetStorageValue();
    element.innerHTML = value;
}

function OnBroadcastChannelButtonClick(event) {
    var element = document.getElementById("BroadcastChannelData");
    bc.BroadcastMessage(broadcastChannel, element.value);
}

function OnBroadcastChannelMessageReceived(event) {
    console.log("OnBroadcastChannelReceiveMessage event: ");
    console.log(event);
    var element = document.getElementById("DataLabel");
    element.innerHTML = event.data;
}