const NOTIFICATION_SETTINGS_KEY = 'animeNotificationSettings'
const NOTIFICATION_SENT_KEY = 'animeNotificationSentEpisodes'
const NOTIFICATION_QUEUE_KEY = 'animeNotificationQueue'
const NOTIFICATION_LAST_SENT_AT_KEY = 'animeNotificationLastSentAt'

export const DEFAULT_NOTIFICATION_SETTINGS = {
  enabled: false,
  notifyEpisodeDrops: true,
  notifySeasonStarts: true,
  quietHoursStart: 23,
  quietHoursEnd: 9,
  cooldownMinutes: 180,
  maxNotificationsPerDigest: 3
}

function safeParseJSON(value, fallback) {
  if (!value) return fallback
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function normalizeSettings(input = {}) {
  const merged = {
    ...DEFAULT_NOTIFICATION_SETTINGS,
    ...input
  }

  merged.quietHoursStart = Number(merged.quietHoursStart)
  merged.quietHoursEnd = Number(merged.quietHoursEnd)
  merged.cooldownMinutes = Math.max(10, Number(merged.cooldownMinutes) || 180)
  merged.maxNotificationsPerDigest = Math.max(1, Number(merged.maxNotificationsPerDigest) || 3)

  return merged
}

export function getNotificationSettings() {
  return normalizeSettings(safeParseJSON(localStorage.getItem(NOTIFICATION_SETTINGS_KEY), {}))
}

export function saveNotificationSettings(nextSettings = {}) {
  const normalized = normalizeSettings(nextSettings)
  localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(normalized))
  return normalized
}

export function isNotificationSupported() {
  return 'Notification' in window
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  return Notification.requestPermission()
}

function isInsideQuietHours(date, settings) {
  const hour = date.getHours()
  const { quietHoursStart, quietHoursEnd } = settings

  if (quietHoursStart === quietHoursEnd) return false
  if (quietHoursStart < quietHoursEnd) {
    return hour >= quietHoursStart && hour < quietHoursEnd
  }

  return hour >= quietHoursStart || hour < quietHoursEnd
}

function getSentEpisodesMap() {
  return safeParseJSON(localStorage.getItem(NOTIFICATION_SENT_KEY), {})
}

function saveSentEpisodesMap(map) {
  localStorage.setItem(NOTIFICATION_SENT_KEY, JSON.stringify(map))
}

function getQueuedNotifications() {
  return safeParseJSON(localStorage.getItem(NOTIFICATION_QUEUE_KEY), [])
}

function saveQueuedNotifications(queue) {
  localStorage.setItem(NOTIFICATION_QUEUE_KEY, JSON.stringify(queue))
}

function shouldNotifyType(event, settings) {
  if (event.kind === 'episode' && !settings.notifyEpisodeDrops) return false
  if (event.kind === 'season-start' && !settings.notifySeasonStarts) return false
  return true
}

function isCooldownElapsed(now, settings) {
  const last = Number(localStorage.getItem(NOTIFICATION_LAST_SENT_AT_KEY) || 0)
  if (!last) return true
  return now.getTime() - last >= settings.cooldownMinutes * 60 * 1000
}

function markSentNow(now) {
  localStorage.setItem(NOTIFICATION_LAST_SENT_AT_KEY, now.getTime().toString())
}

function dedupeByEpisode(events, sentEpisodesMap) {
  return events.filter((event) => {
    const id = String(event.showId)
    const highestSent = Number(sentEpisodesMap[id] || 0)
    return Number(event.episode || 0) > highestSent
  })
}

function mergeQueue(existingQueue, nextEvents) {
  const map = new Map()

  for (const event of [...existingQueue, ...nextEvents]) {
    const key = `${event.showId}:${event.episode}`
    if (!map.has(key)) {
      map.set(key, event)
    }
  }

  return Array.from(map.values())
}

async function showSingleNotification(event) {
  const title =
    event.kind === 'season-start'
      ? `🌸 New season started: ${event.title}`
      : `📺 New episode: ${event.title}`

  const body =
    event.kind === 'season-start'
      ? `Episode ${event.episode} just dropped. Your watchlist is eating good.`
      : `Episode ${event.episode} is out now.`

  const options = {
    body,
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    tag: `anime-release-${event.showId}-${event.episode}`,
    renotify: false,
    data: {
      url: '/bookmarks'
    }
  }

  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    if (registration?.showNotification) {
      await registration.showNotification(title, options)
      return true
    }
  }

  new Notification(title, options)
  return true
}

export async function dispatchReleaseNotifications(events = []) {
  const settings = getNotificationSettings()

  if (!settings.enabled || !isNotificationSupported()) {
    return { sent: 0, queued: 0 }
  }

  if (Notification.permission !== 'granted') {
    return { sent: 0, queued: events.length }
  }

  const now = new Date()
  const sentEpisodesMap = getSentEpisodesMap()
  const eligibleEvents = dedupeByEpisode(
    events.filter((event) => shouldNotifyType(event, settings)),
    sentEpisodesMap
  )

  if (!eligibleEvents.length) {
    return { sent: 0, queued: 0 }
  }

  let queue = mergeQueue(getQueuedNotifications(), eligibleEvents)

  if (isInsideQuietHours(now, settings) || !isCooldownElapsed(now, settings)) {
    saveQueuedNotifications(queue)
    return { sent: 0, queued: queue.length }
  }

  const batch = queue.slice(0, settings.maxNotificationsPerDigest)
  const remaining = queue.slice(settings.maxNotificationsPerDigest)

  let sentCount = 0
  for (const event of batch) {
    await showSingleNotification(event)
    const id = String(event.showId)
    sentEpisodesMap[id] = Math.max(Number(sentEpisodesMap[id] || 0), Number(event.episode || 0))
    sentCount += 1
  }

  saveSentEpisodesMap(sentEpisodesMap)
  saveQueuedNotifications(remaining)
  markSentNow(now)

  return {
    sent: sentCount,
    queued: remaining.length
  }
}
