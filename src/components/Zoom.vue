<template>
  <SvgPanZoom
    :style="'opacity:' + visible ? 1 : 0"
    class="championsHighlight overHighlight zoom-fixed"
    style="user-select: none;"
    @svgpanzoom="registerSvgPanZoom"
    :zoomEnabled="true"
    :dblClickZoomEnabled="false"
    :controlIconsEnabled="false"
    :fit="false"
    :center="false"
    :minZoom="0.1"
    :customEventsHandler="options"
  ><svg style="width: 100%; height: 100%;">
      <defs>
        <clipPath id="match"><rect x="0" y="0" :width="matchWidth" height="60" rx="5" ry="5"></rect></clipPath>
        <clipPath id="half"><rect x="0" y="0" :width="matchWidth" height="30" rx="5" ry="5"></rect></clipPath>
        <filter id="dropshadow" width="135%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> <!-- stdDeviation is how much to blur -->
          <feOffset dx="2" dy="2" result="offsetblur"/> <!-- how much to offset -->
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/> <!-- slope is the opacity of the shadow -->
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/> <!-- this contains the offset blurred image -->
            <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
          </feMerge>
        </filter>
      </defs>

      <g>

        <texts :texts="$store.state.texts"></texts>

        <g v-for="(curve, count) in curves2" :key="'curves2' + '-' + count" :id="'curves2' + '-' + count">
          <g style="fill:none;stroke-width:4;stroke-linecap:butt;">
            <path v-for="(curv, index) in (curves2[count] || []).filter(Boolean)" :key="'curv2' + count + '.' + index" :id="'curv2.' + count + '.' + index"
                  :stroke="curv.color"
                  :stroke-dasharray="curv.dash"
                  :d="curv.d"
            ></path>
          </g>
        </g>

        <g v-for="(stage, s) in stages" :key="'stage' + '-' + s" :id="'stage' + s" :transform="`translate(${stagesPosition[s][0]} ${stagesPosition[s][1]})`">
          <g style="fill:none;stroke-width:4;stroke-linecap:butt;">
            <path v-for="(curv, index) in (curves[s] || []).filter(Boolean)" :key="'curv' + s + '.' + index" :id="'curv' + s + '.' + index"
                  :stroke="curv.color"
                  :stroke-dasharray="curv.dash"
                  :d="curv.d"
            ></path>
          </g>

          <g v-for="(games, index) in matches[s]" :key="'game' + index">
            <match v-for="(game, count) in (games || []).filter(Boolean)" :key="'match' + s + '.' + index + '.' + count"
                   :index="count"
                   :seeds="game.seeds"
                   :order="game.order"
                   :position="game.position"
            ></match>
          </g>

          <!--<g v-for="(place, count) in (places[s] || []).filter(Boolean)" :key="'place' + s + '.' + count">
            <place v-if="place.place"
              :seed="place.seed"
              :order="place.order"
              :position="place.position"
              :rating="place.rating"
              :place="place.place"
              :delta="place.delta"
            ></place>
          </g>-->

          <groupRow
            :s = s
            :position="[0,0]"
          >
          </groupRow>

        </g>

        <texts :texts="$store.state.titles"></texts>

        <g :id="'players-' + 0" v-if="showPlayers">
          <players
            :index="0"
            :order="[0]"
          ></players>
        </g>

        <g :id="'places-' + 0" v-if="showPlaces">
          <places v-for="(place, count) in placesArr" :key="'places' + count"
            :index="count"
            :position="[placesPosition[count][0] + stagesPosition[stages.length - 1][0], placesPosition[count][1] + stagesPosition[stages.length - 1][1]]"
            :placesWidth="350"
          ></places>
        </g>

        <medias></medias>

      </g>
    </svg>
  </SvgPanZoom>
</template>

<script>
// import '../plugins/tourLoader.js'
import Hammer from 'hammerjs'
import SvgPanZoom from 'vue-svg-pan-zoom'
import draggable from 'vuedraggable'
import Match from './Match.vue'
import Places from './Places.vue'
import Medias from './Medias.vue'
import GroupRow from './GroupRow'
import Players from './Players'
import Texts from './Texts'
export default {
  components: { SvgPanZoom, Players, GroupRow, Match, Places, Medias, Texts },
  data: () => ({
    visible: false,
    hammer: null,
    options: {
      // Halt all touch events
      haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],

      // Init custom events handler
      init: function (options) {
        const zoomer = options.instance
        let initialScale = 1
        let pannedX = 0
        let pannedY = 0
        // Init Hammer
        this.hammer = Hammer(options.svgElement)

        this.hammer.on('panleft panright tap press', function (ev) {
          // console.log(ev.type)
          // window.zoom.$emit('clickMedia', 1)
        })

        // Enable pinch
        this.hammer.get('pinch').set({ enable: true })

        // Handle double tap
        this.hammer.on('doubletap', function (ev) {
          zoomer.$store.dispatch('centerMatch')
        })

        // Handle pan
        this.hammer.on('panstart panmove', function (ev) {
          // On pan start reset panned variables
          if (ev.type === 'panstart') {
            pannedX = 0
            pannedY = 0
          }
          // Pan only the difference
          zoomer.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY })
          pannedX = ev.deltaX
          pannedY = ev.deltaY
          const pan = zoomer.getPan()
          // console.log(pan.x, pan.y, zoomer.getZoom())
          localStorage['zoom'] = JSON.stringify({ x: pan.x, y: pan.y, scale: zoomer.getZoom(), section: zoomer.$route.params['section'] })
        })
        // Handle pinch
        this.hammer.on('pinchstart pinchmove', function (ev) {
          // On pinch start remember initial zoom
          if (ev.type === 'pinchstart') {
            initialScale = zoomer.getZoom()
            zoomer.zoomAtPoint(initialScale * ev.scale, { x: ev.center.x, y: ev.center.y })
          }
          if (ev.deltaX) {
            const pan = zoomer.getPan()
            localStorage['zoom'] = JSON.stringify({ x: pan.x, y: pan.y, scale: zoomer.getZoom(), section: zoomer.$route.params['section'] })
          }
          zoomer.zoomAtPoint(initialScale * ev.scale, { x: ev.center.x, y: ev.center.y })
        })

        // Prevent moving the page on some devices when panning over SVG
        options.svgElement.addEventListener('touchmove', (e) => e.preventDefault())
      },

      // Destroy custom events handler
      destroy: function () {
        // this.hammer.destroy()
      }
    }
  }),
  computed: {
    showPlayers () { return this.$store.state.settings.showPlayers },
    showPlaces () { return this.$store.state.settings.showPlaces },
    placesArr () { return new Array(this.$store.state.settings.finalsNum).fill(0) },
    placesOffset () { return this.$store.state.settings.finalsSizes },
    stagesPosition () { return this.$store.state.settings.stagesPosition },
    playersPosition () { return this.$store.state.settings.playersPosition },
    placesPosition () { return this.$store.state.settings.placesPosition },
    matchWidth () { return this.$store.state.settings.matchWidth },
    players () { return this.$store.state.players },
    stages () { return this.$store.state.info.stages },
    matches () { return this.$store.state.matches },
    places () { return this.$store.state.places },
    curves () { return this.$store.state.curves },
    curves2 () { return this.$store.state.curves2 }
  },
  methods: {
    registerSvgPanZoom (zoomer) {
      this.$store.state.zoom = this
      this.$store.state.zoomer = zoomer
      zoomer.$store = this.$store
      zoomer.$route = this.$route
      setTimeout(() => (this.visible = true))
    }
  },
  mounted () {
    if (navigator.standalone === true) {
      // My app is installed and therefore fullscreen
    } else {
      setTimeout(() => window.scrollTo(0, 1))
    }
  },
  beforeDestroy () {
    if (this.$store) {
      if (this.$store.state.zoomer) {
        this.$store.state.zoomer.$store = null
        this.$store.state.zoomer.$route = null
        this.$store.state.zoomer = null
      }
      this.$store.state.zoom = null
    }
  }
}
</script>

<style>
.zoom-fixed {
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
}
.group {
  fill: #ffffff;
}
.group--title {
  font-size: 18px;
  fill: rgb(204, 204, 204);
  opacity: 0.8;
}
</style>
