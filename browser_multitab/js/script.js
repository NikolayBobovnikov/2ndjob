import * as ls from "./modules/local_storage.js";
import * as bc from "./modules/broadcast_channel.js";
import * as sw from "./modules/service_worker.js";
import { button_bc, button_sw, button_ls, button_create_tab, label_data, label_source } from "./elements.js";

const APP = {
  SW: null,

  init() {
    var page = window.location.pathname.split("/").pop();
    console.log("OnContentLoad: " + page);

    // add handler to create tab button click for main page (not defined in the tabs)
    button_create_tab?.addEventListener("click", OnCreateTabButtonClick);

    // subscribe to shared data update events in all browsing contexts
    button_bc.addEventListener("click", OnBroadcastChannelButtonClick);
    button_ls.addEventListener("click", OnLocalStorageButtonClick);
    button_sw.addEventListener("click", OnServiceWorkerButtonClick);

    // setup local storage
    ls.ListenToStorage(callback_ls);
    ls.ClearLocalStorage();

    // setup broadcast channel
    window.broadcastChannel = bc.SubscribeToChannel();
    bc.ListenToBroadcastChannel(broadcastChannel, callback_bc);

    // setup service worker
    //sw.RegisterServiceWorker(callback_sw);
    // Check that the browser supportst Service Worker API.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js", { scope: "/" })
        .then((registration) => {
          // get the service worker from the registration object
          APP.SW = registration.installing || registration.active || registration.waiting;

          console.log("Service worker registered");

          navigator.serviceWorker.ready.then((worker) => {
            console.log("service worker is ready");
            worker.addEventListener("message", (event) => processMessageCallback(event.data, "Service worker"));
            //worker.onmessage = (event) => processMessageCallback(event.data, "Service worker");
          });
        })
        .catch((err) => console.log(err));

      // listen to new service worker
      navigator.serviceWorker.oncontrollerchange = (event) => {
        APP.SW = navigator.serviceWorker.controller;
      };

      // listen to the message from the service worker
      navigator.serviceWorker.addEventListener("message", APP.onMessage);
    }
  },

  onMessage({ data }) {
    console.log("message received from sw: " + data);
    OnMessageReceived(data, "Service worker");
  },
};

document.addEventListener("DOMContentLoaded", APP.init);

function OnCreateTabButtonClick(event) {
  window.open("tab.html", "_blank");
}

function OnMessageReceived(message, source) {
  label_data.innerText = message;
  label_source.innerText = source;
}

function callback_ls(message, source) {
  OnMessageReceived(message, source);
}

function callback_bc(message, source) {
  OnMessageReceived(message, source);
}

function callback_sw(message, source) {
  console.log("callback_sw");
  OnMessageReceived(message, source);
}

function OnLocalStorageButtonClick(event) {
  var element = document.getElementById("LocalStorageData");
  ls.PostMessage(element.value);
}

function OnBroadcastChannelButtonClick(event) {
  var element = document.getElementById("BroadcastChannelData");
  bc.BroadcastMessage(broadcastChannel, element.value);
}

function OnServiceWorkerButtonClick(event) {
  console.log("on servicew woker button click");
  var element = document.getElementById("ServiceWorkerData");
  sw.PostMessage(element.value);
}
