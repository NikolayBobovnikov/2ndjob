console.log({ self });

self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("service worker is installed.");
});

self.addEventListener("activate", (event) => {
  clients.claim().then(() => {
    console.log("claim all pages to use new sw");
  });
  console.log("service worker is activated");
});

self.addEventListener("message", (event) => {
  console.log("received message: ");
  console.log(event.data);
  console.log("from " + event.source.id);
  console.log("post it back to all clients");
  sendMessage({ data: event.data, source_id: event.source.id });
});

const sendMessage = async ({ data, source_id }) => {
  console.log("sending message to all clients except for the source " + source_id);

  const allClients = await clients.matchAll({
    includeUncontrolled: true,
  });

  return Promise.all(
    allClients.map((client) => {
      if (client.id !== source_id) {
        return client.postMessage(data);
      }
    })
  );
};
