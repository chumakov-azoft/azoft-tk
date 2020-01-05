<template>
  <div id="silentbox-overlay" v-show="isVisible">
    <div id="silentbox-overlay__background" @click.stop="closeSilentboxOverlay"></div>

    <div id="silentbox-overlay__content">
      <div id="silentbox-overlay__embed">
        <div id="silentbox-overlay__container" @click.stop>
          <keep-alive v-if="tubeVideo">
            <youtube :video-id="getEmbedUrl" ref="tube" width="100%" height="100%"
                     @ready="onReady"
                     @playing="onStartPlaying"
                     @paused="onPaused"
            ></youtube>
          </keep-alive>

          <keep-alive>
            <audio-player ref="audioPlayer" :current="audioCurrent"></audio-player>
          </keep-alive>

          <scoreboard v-if="tubeVideo && tubeData" :score1="scoreArray[0]" :score2="scoreArray[1]"
                      :record1="scoreArray[2]" :record2="scoreArray[3]" :status="scoreStatus" id="board"></scoreboard>

          <iframe width="100%" height="100%" v-if="vimeoVideo" :src="getEmbedUrl" frameborder="0"
                  :allow="getAutoplayState" allowfullscreen></iframe>

            <img width="auto" height="auto" :src="getEmbedUrl" v-if="!vimeoVideo && !tubeVideo">
        </div>
        <p id="silentbox-overlay__description" v-if="this.$parent.description" @click.stop>{{
          this.$parent.description }}</p>
      </div>
    </div>

    <div id="silentbox-overlay__close-button" role="button" tabindex="3" @click.stop="closeSilentboxOverlay"
         @keyup.enter="closeSilentboxOverlay">
      <div class="icon"></div>
    </div>

    <div id="silentbox-overlay__arrow-buttons" v-if="this.$parent.items.total > 0">
      <div class="arrow arrow-previous" role="button" tabindex="2" @click="moveToPreviousItem"
           @keyup.enter="moveToPreviousItem"></div>
      <div class="arrow arrow-next" role="button" tabindex="1" @click="moveToNextItem"
           @keyup.enter="moveToNextItem"></div>
    </div>
  </div>
</template>

<script>
import VideoUrlDecoderMixin from './../mixins/videoUrlDecoder'
import Vue from 'vue'
import audioPlayer from './audioPlayer'
import VueYoutube from 'vue-youtube'
import Scoreboard from './Scoreboard'

Vue.use(VueYoutube)

export default {
  name: 'SilentboxOverlay',
  components: { Scoreboard, audioPlayer },
  mixins: [ VideoUrlDecoderMixin ],
  data () {
    return {
      videoId: '',
      videoState: null,
      vimeoVideo: false,
      audioPlayer: null,
      tubePlayer: null,
      tubeVideo: false,
      tubeData: false,
      tubePosition: 0,
      tubePositionLast: 0,
      tubePositionIndex: 0,
      tubePlaying: false,
      audioPosition: 0,
      audioPositionIndex: 0,
      audioCurrent: '',
      lastPoint: null,
      interval: null,
      oldKeyDown: null,
      keyAdded: false
    }
  },
  computed: {
    audioTime () {
      return this.videoState.audioTime || [0]
    },
    audioFiles () {
      return this.videoState.audio || ['']
    },
    scoreTime () {
      return this.videoState.scoreTime
    },
    score () {
      return this.videoState.score
    },
    scoreStatus () {
      if (!this.scoreTime || !this.scoreArray || this.scoreArray.length <= 4) {
        return ''
      }
      const code = this.scoreArray[4]
      if (code === '100') {
        return 'win1'
      } else if (code === '200') {
        return 'win2'
      }
      return ''
    },
    scoreArray () {
      if (!this.scoreTime) {
        return [0, 0, 0, 0, 0]
      } else if (this.tubePositionIndex === -1) {
        return this.score[this.score.length - 1].split(' ')
      } else {
        return this.score[this.tubePositionIndex].split(' ')
      }
    },
    getEmbedUrl () {
      return this.handleUrl(this.$parent.embedUrl)
    },
    getAutoplayState () {
      if (this.$parent.autoplay !== undefined && this.$parent.autoplay !== false) {
        return 'autoplay'
      }
      return ''
    },
    isVisible () {
      return this.$parent.overlayVisibility !== undefined && this.$parent.overlayVisibility !== false
    }
  },
  watch: {
    isVisible: function (value) {
      if (document !== undefined) {
        this.bodyScrolling()
      }
      if (value) {
        if (this.tubePlayer) {
          // this.startTubeVideo()
          this.tubePlayer.playVideo()
        }
      } else {
        if (this.tubeVideo) {
          this.stopTubeVideo()
        }
        if (this.$route.params.media !== null) {
          this.$router.push({ params: { ...this.$route.params, score: null, media: null } })
        }
      }
    },
    tubePosition: function (value) {
      if (!this.tubeData) {
        return
      }
      let i = 0
      const l = this.scoreTime ? this.scoreTime.length - 1 : 0
      while (i < l && this.tubePosition > this.scoreTime[i]) {
        i++
      }
      // console.log('video pos', (this.tubePosition < this.scoreTime[i] ? i - 1 : i), this.tubePosition, this.scoreTime[i])
      const p = this.tubePosition < this.scoreTime[i] ? i - 1 : i
      if (p !== this.tubePositionIndex) {
        this.tubePositionIndex = p
        if (p > 0) {
          const formattedScore = this.scoreArray[0] + ':' + this.scoreArray[1] + '-' + this.scoreArray[2] + ':' + this.scoreArray[3]
          if (formattedScore !== this.$route.params.score) {
            this.$router.replace({ params: { ...this.$route.params, score: formattedScore } })
          }
        }
      }
    },
    audioPosition: async function (seconds) {
      if (!this.tubeData) {
        return
      }
      let i = 0
      const l = this.audioTime ? this.audioTime.length - 1 : 0
      while (i < l && this.audioPosition > this.audioTime[i]) {
        i++
      }
      const p = this.audioPosition < this.audioTime[i] ? i - 1 : i
      const p1 = (seconds - this.audioTime[p])
      if (this.audioFiles[p] !== this.audioCurrent) {
        this.audioPlayer.stop()
        this.audioCurrent = this.audioFiles[p]
        // console.log('set audio file', this.audioFiles[p], this.audioPosition)
      }
      if (Math.abs(p1 - this.audioPlayer.getPosition()) > 3) {
        this.audioPlayer.setPosition(p1)
      }
      // console.log('audio pos', p1, this.audioPlayer.getPosition(), this.audioPlayer.getDuration())
      // console.log('audio pos', this.audioPosition, this.tubePlaying, this.audioPlayer.playing)
      if (this.tubePlaying && !this.audioPlayer.playing) {
        // console.log('play it', this.audioPlayer.duration)
        this.audioPlayer.play().catch(response => {
          // console.error(response)
          this.tubePlayer.pauseVideo()
        })
      }
      const volume = await this.tubePlayer.isMuted() ? 0 : await this.tubePlayer.getVolume() / 100
      if (Math.abs(volume - this.audioPlayer.getVolume()) > 0.1) {
        this.audioPlayer.setVolume(volume)
      }
    }
  },
  methods: {
    initKey () {
      if (!this.tubePlayer || !this.isVisible) return
      // this.audioPlayer.mute()
      this.oldKeyDown = document.onkeydown
      document.querySelector('#silentbox-overlay iframe').onkeydown = document.onkeydown = (e) => {
        e = e || window.event
        console.log('scores', e.code)
        if (e.code === 'BracketLeft' && e.altKey) {
          this.$store.dispatch('shrinkVideoPoint', { position: this.tubePosition })
        } else if (e.code === 'BracketRight' && e.altKey) {
          this.$store.dispatch('showVideoPoint', { position: this.tubePosition })
        } else if (e.code === 'BracketLeft') {
          this.$store.dispatch('addVideoPoint', this.lastPoint = { k: e.shiftKey ? 0 : 2, position: this.tubePosition })
        } else if (e.code === 'BracketRight') {
          this.$store.dispatch('addVideoPoint', this.lastPoint = { k: e.shiftKey ? 1 : 3, position: this.tubePosition })
        } else if ((e.code === 'Backspace')) {
          this.prevScore()
          if (this.scoreTime.length > 0) {
            this.scoreTime.pop()
            this.score.pop()
          }
        } else if ((e.code === 'KeyR') && this.lastPoint) {
          if (this.scoreTime.length > 0) {
            this.scoreTime.pop()
            this.score.pop()
          }
          this.lastPoint.k = this.lastPoint.k < 2 ? 1 - this.lastPoint.k : 5 - this.lastPoint.k
          this.$store.dispatch('addVideoPoint', this.lastPoint)
        } else if ((e.code === 'ArrowLeft')) {
          this.prevScore()
        } else if ((e.code === 'ArrowRight')) {
          this.nextScore()
        } else if ((e.code === 'Home')) {
          this.firstScore()
        } else if ((e.code === 'End')) {
          this.lastScore()
        } else if ((e.code === 'Space')) {
          this.playPauseTubeVideo()
        } else if ((e.code === 'KeyM') && e.altKey) {
          this.audioPlayer.mute()
        } else if ((e.code === 'KeyV') && e.altKey) {
          const board = document.querySelector('#board')
          console.log(board)
          if (board) {
            if (board.classList.contains('board-hide')) {
              board.classList.remove('board-hide')
            } else {
              board.classList.add('board-hide')
            }
          }
        } else if ((e.code === 'KeyT') && e.altKey) {
          let current = 0
          let n = 0
          for (let i = 0; i < this.score.length; i++) {
            let score = this.score[i].split(' ')
            if (score[2] === '0' && score[3] === '0' && i !== 0) {
              n++
              let time = new Date(this.scoreTime[i] * 1000).toISOString().substr(14, 5)
              let timeEnd = new Date(this.scoreTime[i] * 1000 - current).toISOString().substr(14, 5)
              let timeStart = new Date(current).toISOString().substr(14, 5)
              console.log(n, 'starts:', timeStart, 'length:', timeEnd, 'ends:', time)
              current = this.scoreTime[i] * 1000
            }
          }
        }
      }
    },
    bodyScrolling () {
      let body = document.body

      // add class only if overlay should be visible
      if (this.isVisible && !body.classList.contains('silentbox-is-opened')) {
        return body.classList.add('silentbox-is-opened')
      }

      // remove class only if overlay should be hidden
      if (!this.isVisible && body.classList.contains('silentbox-is-opened')) {
        return body.classList.remove('silentbox-is-opened')
      }
    },
    moveToNextItem () {
      this.$parent.nextItem()
      if (this.$route.params.media !== this.$parent.mid) {
        this.$router.replace({ params: { ...this.$route.params, score: null, media: this.$parent.mid } })
      }
    },
    moveToPreviousItem () {
      this.$parent.prevItem()
      if (this.$route.params.media !== this.$parent.mid) {
        this.$router.replace({ params: { ...this.$route.params, score: null, media: this.$parent.mid } })
      }
    },
    closeSilentboxOverlay () {
      this.$parent.$emit('closeSilentboxOverlay')
    },
    handleUrl (url) {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        this.vimeoVideo = false
        this.tubeVideo = true
        const id = this.getYoutubeVideoId(url)
        if (this.videoId !== id) {
          this.videoId = id
          this.tubeData = false
          if (this.tubePlayer && this.isVisible) {
            this.startTubeVideo()
          }
        }
        return this.videoId
      } else if (url.includes('vimeo')) {
        if (this.tubeVideo) {
          this.stopTubeVideo()
        }
        this.tubeVideo = false
        this.vimeoVideo = true
        return this.getVimeoVideo(url)
      } else {
        if (this.tubeVideo) {
          this.stopTubeVideo()
        }
        // Given url is not a video URL thus return it as it is.
        this.tubeVideo = false
        this.vimeoVideo = false
        return url
      }
    },
    getYoutubeVideo (url) {
      let videoUrl = ''
      let videoId = this.getYoutubeVideoId(url)

      if (videoId) {
        videoUrl = 'https://www.youtube.com/embed/' + videoId + '?rel=0'

        if (this.$parent.autoplay) {
          videoUrl += '&amp;autoplay=1'
        }
        if (this.$parent.showControls) {
          videoUrl += '&amp;controls=0'
        }
      }

      return videoUrl
    },
    getVimeoVideo (url) {
      let videoUrl = ''
      const vimoId = /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/.exec(url)[3]

      if (vimoId !== undefined) {
        videoUrl = 'https://player.vimeo.com/video/' + vimoId + '?api=1'
        if (this.$parent.autoplay) {
          videoUrl += '&autoplay=1'
        }
      }

      return videoUrl
    },
    onStartPlaying () {
      this.tubePlaying = true
      // console.log('onStartPlaying')
      this.clearInterval()
      this.interval = setInterval(this.updateScore, 100)
      this.updateScore()
    },
    onPaused () {
      this.clearInterval()
      this.tubePlaying = false
      this.audioPlayer.pause()
      // console.log('onPaused')
    },
    onReady () {
      // console.log('onReady')
      this.tubePlayer = this.$refs.tube.player
      this.audioPlayer = this.$refs.audioPlayer
      // console.log(this.$refs.tube, this.$refs.audioPlayer)
      if (this.isVisible) {
        this.startTubeVideo()
      }
    },
    stopTubeVideo () {
      this.tubePlaying = false
      this.tubePlayer.pauseVideo()
      this.audioPlayer.stop()
      document.onkeydown = this.oldKeyDown
      this.keyAdded = false
    },
    startTubeVideo () {
      if (!this.keyAdded) setTimeout(() => this.initKey())
      this.tubePlaying = false
      this.tubePlayer.playVideo()
      this.loadBoard(this.videoId)
    },
    async playPauseTubeVideo () {
      const playing = await this.tubePlayer.getPlayerState()
      playing ? this.tubePlayer.pauseVideo() : this.tubePlayer.playVideo()
    },
    async loadBoard (id) {
      await this.$store.dispatch('loadVideoBoard', id)
      this.videoState = this.$store.state.video
      this.tubeData = !!this.videoState
      if (this.tubeData) {
        this.audioPlayer.preloadAudio(this.videoState.audio)
        if (this.audioFiles && this.audioFiles[0] !== this.audioCurrent) {
          // console.log('set audio file 0', this.audioFiles[0])
          this.audioCurrent = this.audioFiles[0]
        }
        // console.log(2222, id, this.$store.state.video.audio, this.audioTime, this.audioFiles)
        this.firstScore()
        if (this.tubePlayer && this.$route.params.score) {
          this.seekScore()
        }
      }
    },
    seekScore (event) {
      const scoreClear = this.$route.params.score.split(/[-: ]+/gi).slice(0, 4).join(' ')
      const position = this.score.findIndex((item) => item.indexOf(scoreClear) === 0)
      if (position > -1) {
        this.tubePlayer.seekTo(this.scoreTime[position])
        this.audioPlayer.setPosition(this.scoreTime[position])
        this.audioPlayer.play()
      }
    },
    updateScore () {
      if (!this.tubePlayer || !this.tubeData || !this.isVisible) {
        this.clearInterval()
      }
      this.tubePlayer.getCurrentTime().then((seconds) => {
        // console.log(seconds, this.audioPlayer.getPosition())
        this.tubePosition = seconds
        this.audioPosition = seconds
      })
    },
    updatePosition (seconds) {
      if (this.tubePositionLast === seconds) {
        return
      }
      this.tubePositionLast = seconds
    },
    prevScore () {
      if (this.tubePositionIndex > 0) {
        this.tubePositionIndex--
        this.tubePlayer.seekTo(this.scoreTime[this.tubePositionIndex])
      }
    },
    nextScore () {
      if (this.tubePositionIndex < this.scoreTime.length - 1) {
        this.tubePositionIndex++
        this.tubePlayer.seekTo(this.scoreTime[this.tubePositionIndex])
      }
    },
    firstScore () {
      this.tubePosition = 0
      this.tubePositionIndex = 0
      this.tubePlayer.seekTo(0)
    },
    lastScore () {
      this.tubePositionIndex = this.scoreTime.length - 1
      this.tubePlayer.seekTo(this.scoreTime[this.tubePositionIndex])
    },
    clearInterval () {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    }
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>

<style lang="scss">
@mixin element($element) {
    &__#{$element} {
        @content;
    }
}

// Colours used in silentbox
$main:   #fff;
$accent: #58e8d2;
$bg: #000;

.board-hide {
  display: none;
}

.silentbox-is-opened {
  overflow: hidden;
}

#silentbox-overlay {
  display: block;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;

  @include element(background) {
    background: rgba($bg, .75);
    backdrop-filter: blur(20px);
    cursor: default;
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @include element(content) {
    cursor: default;
    display: block;
    height: 100%;
    position: relative;
    width: 100%;
  }

  @include element(embed) {
    bottom: 0;
    cursor: default;
    display: block;
    height: 80%;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: -2.5rem;
    width: 75%;

    @media screen and (max-width: 800px) {
      width: 100%
    }

    img,
    iframe {
      background-color: $bg;
      bottom: 0;
      box-shadow: 0 0 1.5rem rgba($bg, .45);
      cursor: default;
      display: block;
      left: 0;
      margin: auto;
      max-height: 100%;
      max-width: 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @include element(container) {
    cursor: default;
    height: 100%;
    margin: 0 0 1.5rem 0;
    position: relative;
    text-align: center;
    width: 100%;
  }

  @include element(description) {
    display: block;
    padding-top: 1rem;
    text-align: center;
    color: $main;
  }

  @include element(close-button) {
    background: rgba($bg, .0);
    border: none;
    color: $main;
    cursor: pointer;
    height: 2.5rem;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-color 250ms ease-out;
    width: 2.5rem;
    &:hover,
    &:focus {
      background-color: rgba($bg, .5);
      outline: none;
    }

    .icon {
      color: $main;
      cursor: pointer;
      height: 1rem;
      left: .7rem;
      margin: 50% 50% 0 0;
      position: absolute;
      right: 0px;
      top: -.5rem;
      transition: 250ms ease;
      width: 1rem;

      &:before,
      &:after {
        background: $main;
        content: "";
        height: 2px;
        left: 5%;
        position: absolute;
        top: 50%;
        transition: 250ms ease;
        width: 100%;
      }

      &:before {
        transform: rotate(-45deg);
      }

      &:after {
        transform: rotate(45deg);
      }

      &:hover,
      &:focus {
        &:before,
        &:after {
          background: $accent;
          left: 25%;
          width: 50%;
        }
      }
    }
  }

  @include element(arrow-buttons) {
    .arrow {
      border-left: 2px solid $main;
      border-top: 2px solid $main;
      cursor: pointer;
      height: 1.5rem;
      position: absolute;
      width: 1.5rem;

      &:hover,
      &:focus {
        outline: none;
        border-color: $accent;
      }
    }
    .arrow-previous {
      left: 2rem;
      top: 50%;
      transform: rotate(-45deg);

      &:hover,
      &:focus {
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-name: pulsingPrevious;
      }

      @media screen and (max-width: 800px) {
        top: calc(100% - 55px);
      }
    }
    .arrow-next {
      right: 2rem;
      top: 50%;
      transform: rotate(135deg);

      &:hover,
      &:focus {
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-name: pulsingNext;
      }

      @media screen and (max-width: 800px) {
        top: calc(100% - 55px);
      }
    }
  }
}

// Animations
@keyframes pulsingNext {
  0% {
    animation-timing-function: ease-in;
    right: 2rem;
  }
  25% {
    animation-timing-function: ease-in;
    right: 1.75rem;
  }
  75% {
    animation-timing-function: ease-in;
    right: 2.25rem;
  }
  100% {
    animation-timing-function: ease-in;
    right: 2rem;
  }
}

@keyframes pulsingPrevious {
  0% {
    animation-timing-function: ease-in;
    left: 2rem;
  }
  25% {
    animation-timing-function: ease-in;
    left: 1.75rem;
  }
  75% {
    animation-timing-function: ease-in;
    left: 2.25rem;
  }
  100% {
    animation-timing-function: ease-in;
    left: 2rem;
  }
}
</style>
