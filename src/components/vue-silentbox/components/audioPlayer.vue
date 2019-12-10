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
    },
    ended: {
      type: Function,
      default: () => {}
    },
    canPlay: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    duration: function () {
      return this.audio ? formatTime(this.totalDuration) : ''
    },
    audioIndex: function () {
      // console.log('get audio index')
      return this.audios.indexOf(this.current)
    },
    audio: function () {
      // console.log('get audio')
      const a = document.querySelector('#aPlayer' + this.audioIndex)
      return a
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
    getPosition () {
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return 0
      return this.audio.currentTime
    },
    setPosition (seconds) {
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return
      this.audio.currentTime = seconds
    },
    setPercentPosition (percent) {
      this.audio.currentTime = parseInt(this.audio.duration / 100 * percent)
    },
    stop () {
      this.paused = this.playing = false
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
      }
    },
    play () {
      this.paused = false
      this.playing = true
      // console.log('play1', this.audio && this.audio.readyState)
      if (!this.audio || !this.audio.readyState || this.audio.readyState < 2) return
      // console.log('play2', this.current, this.audio.currentTime, this.audio, this.audio.duration)
      this.audio.play()
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
      this.volumeValue = this.isMuted ? 0 : 100
    },
    reload () {
      this.audio.load()
    }
  }
}
</script>
