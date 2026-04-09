<template>
  <div class="settings-root">
    <p class="subtitle">
      Stay informed without spam. We bundle alerts using quiet hours and cooldown windows.
    </p>

    <div class="row">
      <label class="switch-row">
        <input type="checkbox" v-model="settings.enabled" @change="saveAllSettings" />
        <span>Enable release notifications</span>
      </label>
      <button class="permission-btn" @click="enableBrowserPermission">
        Allow Browser Notifications
      </button>
    </div>

    <div class="grid" :class="{ disabled: !settings.enabled }">
      <label class="switch-row">
        <input type="checkbox" v-model="settings.notifyEpisodeDrops" @change="saveAllSettings" />
        <span>Notify when new episodes drop</span>
      </label>

      <label class="switch-row">
        <input type="checkbox" v-model="settings.notifySeasonStarts" @change="saveAllSettings" />
        <span>Notify when a new season starts</span>
      </label>

      <div class="number-row">
        <span>Quiet hours</span>
        <div class="inputs-wrap">
          <input
            type="number"
            min="0"
            max="23"
            v-model.number="settings.quietHoursStart"
            @change="saveAllSettings"
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            max="23"
            v-model.number="settings.quietHoursEnd"
            @change="saveAllSettings"
          />
        </div>
      </div>

      <div class="number-row">
        <span>Cooldown (minutes)</span>
        <input
          type="number"
          min="10"
          step="10"
          v-model.number="settings.cooldownMinutes"
          @change="saveAllSettings"
        />
      </div>

      <div class="number-row">
        <span>Max alerts per digest</span>
        <input
          type="number"
          min="1"
          max="10"
          v-model.number="settings.maxNotificationsPerDigest"
          @change="saveAllSettings"
        />
      </div>
    </div>

    <p class="permission-status">
      Browser permission: <strong>{{ permissionStatus }}</strong>
    </p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAnimeData } from '@/stores/anime_data'
import {
  getNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermission,
  isNotificationSupported
} from '@/js/notificationEngine'

const toast = useToast()
const settings = reactive(getNotificationSettings())

const permissionStatus = ref(isNotificationSupported() ? Notification.permission : 'unsupported')

const setColor = computed(() => {
  return useAnimeData().getAccentColor
})

function saveAllSettings() {
  const saved = saveNotificationSettings(settings)
  Object.assign(settings, saved)
}

async function enableBrowserPermission() {
  const result = await requestNotificationPermission()
  permissionStatus.value = result

  if (result === 'granted') {
    settings.enabled = true
    saveAllSettings()
    toast.success('Notifications enabled. We will keep them low-noise 👌')
    return
  }

  if (result === 'denied') {
    toast.error('Notifications are blocked in your browser settings.')
    return
  }

  if (result === 'unsupported') {
    toast.error('This browser does not support notifications.')
  }
}
</script>

<style scoped>
.settings-root {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #f5f8ff;
  background: linear-gradient(180deg, rgba(2, 14, 24, 0.7), rgba(2, 10, 20, 0.55));
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  padding: 0.9rem;
}

.subtitle {
  margin: 0;
  color: #e6edf8;
  font-weight: 500;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.grid {
  display: grid;
  gap: 0.75rem;
}

.grid.disabled {
  opacity: 0.65;
  pointer-events: none;
}

.switch-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #f2f6ff;
}

.switch-row span {
  color: #f2f6ff;
}

.number-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: #e9f1ff;
}

.inputs-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

input[type='number'] {
  width: 80px;
  font-weight: 700;
  color-scheme: dark;
}

input[type='checkbox'] {
  width: 1rem;
  height: 1rem;
  accent-color: v-bind(setColor);
}

input[type='number'],
.permission-btn {
  border: 1px solid v-bind(setColor + '90');
  border-radius: 8px;
  background: rgba(6, 20, 33, 0.82);
  color: #f7fbff;
  padding: 0.45rem 0.6rem;
}

.permission-btn {
  cursor: pointer;
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}

.permission-btn:hover {
  background: v-bind(setColor + '30');
}

.permission-status {
  margin: 0;
  color: #f0f5ff;
}

.permission-status strong {
  color: #ffffff;
}
</style>
