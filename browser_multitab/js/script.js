import * as ls from "./modules/local_storage.js";
import * as bc from "./modules/broadcast_channel.js";

document.addEventListener("DOMContentLoaded", OnContentLoad);

function OnContentLoad(event) {
    var page = window.location.pathname.split("/").pop();
    console.log("OnContentLoad: " + page);

    // add handler to create tab button click for main page
    if (page == "index.html") {
        document.getElementById("CreateTabButton").addEventListener("click", OnCreateTabButtonClick);
    }

    // subscribe to shared data update events in all browsing contexts
    document.getElementById("BroadcastChannelButton").addEventListener("click", OnBroadcastChannelButtonClick);
    document.getElementById("LocalStorageButton").addEventListener("click", OnLocalStorageButtonClick);

    // setup local storage
    ls.ListenToStorage(OnMessageReceived);
    ls.ClearLocalStorage();

    // setup broadcast channel
    window.broadcastChannel = bc.SubscribeToChannel();
    bc.ListenToBroadcastChannel(broadcastChannel, OnMessageReceived);

    // Check that the browser supportst Service Worker API.
    if ("serviceWorker" in navigator) {
        // Весь код регистрации у нас асинхронный.
        navigator.serviceWorker
            .register("./js/modules/sw.js")
            .then(() =>
                navigator.serviceWorker.ready.then((worker) => {
                    console.log("service worker is ready");
                    worker.message;
                })
            )
            .catch((err) => console.log(err));
    }
}

function OnCreateTabButtonClick(event) {
    window.open("tab.html", "_blank");
}

function OnMessageReceived(message, source) {
    document.getElementById("DataLabel").innerText = message;
    document.getElementById("SourceLabel").innerText = source;
}

function OnLocalStorageButtonClick(event) {
    var element = document.getElementById("LocalStorageData");
    ls.PostMessage(element.value);
}

function OnBroadcastChannelButtonClick(event) {
    var element = document.getElementById("BroadcastChannelData");
    bc.BroadcastMessage(broadcastChannel, element.value);
}