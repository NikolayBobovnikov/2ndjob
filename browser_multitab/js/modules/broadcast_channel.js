// key for the syncronized resource for storing in local storage
const broadcastChannelName = "BroadcastChannel";

// Add listener for the storage update event
export function SubscribeToChannel() {
  // Connection to a broadcast channel
  const channel = new BroadcastChannel(broadcastChannelName);

  return channel;
}

export function BroadcastMessage(bc, message) {
  // Example of sending of a very simple message
  bc.postMessage(message);
}

export function ListenToBroadcastChannel(bc, handler) {
  bc.onmessage = handler;
}

function handl(event) {
  console.log("Default handl: " + event);
}
