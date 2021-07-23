<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import src from './example.mp3'

const isPlaying = ref(false)
const animateRef = ref<SVGAnimateElement | null>(null)

const play = 'M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28'
const pause = 'M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26'

const audioRef = ref<HTMLAudioElement | undefined>(undefined)
const duration = ref(NaN)
const audioListeners = {
  stalled () {
    isPlaying.value = false
  },
  ended () {
    isPlaying.value = false
  },
  error () {
    isPlaying.value = false
  },
  durationchange () {
    if (audioRef.value) duration.value = audioRef.value.duration || NaN
  },
}

watch(isPlaying, isPlaying => {
  animateRef.value?.beginElement()

  isPlaying ? audioRef.value?.play() : audioRef.value?.pause()
})
</script>

<template>
  <div class="mx-auto my-20vh max-w-max">
    <button class="play-button h-50 w-50 bg-violet-500 text-white rounded-full grid place-items-center transform transition-transform transition-bg" aria-live="assertive" @click="isPlaying = !isPlaying">
      <svg
        :class="{ 'pl-2px': !isPlaying }"
        class="fill-current h-2/3 transition-all"
        viewBox="0 0 36 36"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path :d="play">
          <animate
            ref="animateRef"
            begin="0s"
            attributeType="XML"
            attributeName="d"
            fill="freeze"
            :from="isPlaying ? play : pause"
            :to="isPlaying ? pause : play"
            dur="0.2s"
            keySplines=".4 0 1 1"
            repeatCount="1"
          />
        </path>
      </svg>
    </button>
    <audio ref="audioRef" class="hidden" :src="src" preload="metadata" v-on="audioListeners"/>
    <div v-if="isFinite(duration)" class="hidden">{{ duration }} seconds</div>
  </div>
</template>

<style scoped>
.play-button {
  @apply opacity-85 duration-400;

  outline: none!important;
}

.play-button:hover,
.play-button:focus {
  @apply opacity-100 scale-110;
}
</style>
