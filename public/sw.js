// Junior's Supermarket – Push Notification Service Worker

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = { title: "Junior's Supermarket", body: event.data.text() };
  }

  const title = data.title || "Junior's Supermarket";
  const options = {
    body: data.body || "Check out our latest deals!",
    icon: "/logo.png",
    badge: "/logo.png",
    tag: data.tag || "juniors-push",
    data: { url: data.url || "/weekly-ad" },
    requireInteraction: false,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/weekly-ad";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
