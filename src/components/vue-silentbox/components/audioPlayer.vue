<template>
  <div>
    <audio v-for="(sound, index) in audios" :id="'aPlayer'+index" :key="'aPlayer'+index" :src="sound" preload="auto"></audio>
  </div>
</template>
<script>
const formatTime = (secend) => {
  let time = new Date(secend * 1000).toISOString().substr(11, 8)
  return time
}
export default {
  name: 'audioPlayer',
  props: {
    current: {
      type: String,
      default: ''
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    duration: function () {
      return this.audio ? formatTime(this.audio.duration) : ''
    },
    audioIndex: function () {
      // console.log('get audio index')
      return this.audios.indexOf(this.current)
    },
    audio: function () {
      return document.querySelector('#aPlayer' + this.audioIndex)
    }
  },
  watch: {
    current: {
      immediate: true,
      handler (value, old) {
        // console.log('current change', old, value, this.audio, this.audios)
        if (!value) return
        if (!this.audios.includes(value)) {
          // console.log('push', value, this.audios)
          this.audios.push(value)
        }
        if (old) {
          const indexOld = this.audios.indexOf(old)
          const audioOld = document.querySelector('#aPlayer' + indexOld)
          if (audioOld) {
            audioOld.pause()
            audioOld.currentTime = 0
          }
        }
      }
    }
  },
  data () {
    return {
      audios: [],
      isMuted: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: '00:00:00',
      totalDuration: 0
    }
  },

  methods: {
    getDuration () {
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return 0
      return this.audio.duration
    },
    getPosition () {
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return 0
      return this.audio.currentTime
    },
    setPosition (seconds) {
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return
      this.audio.currentTime = seconds
    },
    getVolume () {
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return 0
      return this.audio.volume
    },
    setVolume (value) {
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return 0
      this.audio.volume = value
    },
    setPercentPosition (percent) {
      this.audio.currentTime = parseInt(this.audio.duration / 100 * percent)
    },
    stop () {
      // console.log('audio stop')
      this.paused = this.playing = false
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
      }
    },
    play () {
      // console.log('play1', this.audio && this.audio.readyState)
      // console.log('audio play try')
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return Promise.resolve(null)
      // console.log('audio play')
      // console.log('play2', this.current, this.audio.currentTime, this.audio, this.audio.duration)
      this.paused = false
      this.playing = true
      return this.audio.play()
    },
    pause () {
      this.paused = true
      this.playing = false
      // console.log('pause', this.audio.readyState)
      if (!this.audio || !this.audio.readyState) return
      this.audio.pause()
    },
    download () {
      this.audio.pause()
      window.open(this.file, 'download')
    },
    mute () {
      this.isMuted = !this.isMuted
      this.audio.muted = this.isMuted
    },
    reload () {
      this.audio.load()
    },
    preloadAudio (audios) {
      // console.log('---', audios)
      audios.forEach((audio) => {
        if (!this.audios.includes(audio)) {
          this.audios.push(audio)
        }
      })
    }
  }
}
</script>
