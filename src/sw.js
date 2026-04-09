import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST || [])
cleanupOutdatedCaches()

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const targetUrl = event.notification?.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const matchingClient = clients.find((client) => client.url.includes(self.location.origin))

      if (matchingClient) {
        matchingClient.navigate(targetUrl)
        return matchingClient.focus()
      }

      return self.clients.openWindow(targetUrl)
    })
  )
})
