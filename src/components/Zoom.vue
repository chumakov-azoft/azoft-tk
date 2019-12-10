<template>
  <SvgPanZoom
    :style="'opacity:' + visible ? 1 : 0"
    class="championsHighlight overHighlight"
    style="width: 100%; height: 100%; user-select: none;"
    @svgpanzoom="registerSvgPanZoom"
    :zoomEnabled="true"
    :dblClickZoomEnabled="false"
    :controlIconsEnabled="false"
    :fit="false"
    :center="false"
    :customEventsHandler="options"
  ><svg style="width: 100%; height: 100%;">
      <defs>
        <clipPath id="match"><rect x="0" y="0" :width="matchWidth" height="60" rx="5" ry="5"></rect></clipPath>
        <clipPath id="half"><rect x="0" y="0" :width="matchWidth" height="30" rx="5" ry="5"></rect></clipPath>
        <filter id="dropshadow" height="130%">
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
      <g style="fill:none;stroke-width:4;stroke-linecap:butt;">
        <path v-for="(curv, index) in curves" :key="'curv' + index"
              :stroke="curv.color"
              :stroke-dasharray="curv.dash"
              :d="curv.d"
        ></path>
      </g>
      <g>
        <g v-for="(games, index) in matches" :key="'game' + index">
          <match v-for="(game, count) in (games || []).filter(Boolean)" :key="index + '.' + count" :transform1="`translate(0 ${count * 80})`"
                 :seeds="game.seeds"
                 :order="game.order"
                 :names="game.names"
                 :logos="game.logos"
                 :position="game.position"
                 :ratings="game.ratings"
                 :scores="game.scores"
                 :status="game.status"
          ></match>
        </g>
        <g v-for="(place, count) in (places || []).filter(Boolean)" :key="'place' + count">
          <place
            :seed="place.seed"
            :order="place.order"
            :position="place.position"
            :rating="place.rating"
            :place="place.place"
            :delta="place.delta"
          ></place>
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
import Place from './Place.vue'
import Medias from './Medias.vue'
export default {
  components: { SvgPanZoom, Match, Place, Medias },
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
          localStorage['zoom'] = JSON.stringify({ x: pan.x, y: pan.y, scale: zoomer.getZoom() })
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
            localStorage['zoom'] = JSON.stringify({ x: pan.x, y: pan.y, scale: zoomer.getZoom() })
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
    matchWidth: function () { return this.$store.state.settings.matchWidth },
    matches () {
      return this.$store.state.matches
    },
    places () {
      return this.$store.state.places
    },
    curves () {
      return this.$store.state.curves
    }
  },
  methods: {
    registerSvgPanZoom (zoomer) {
      this.$store.state.zoom = this
      this.$store.state.zoomer = zoomer
      zoomer.$store = this.$store
      setTimeout(() => (this.visible = true))
      if (localStorage['zoom']) {
        const zoomStored = JSON.parse(localStorage['zoom'])
        if (zoomStored.scale && zoomStored.scale > 0.1 && zoomStored.scale < 3) {
          zoomer.zoom(zoomStored.scale)
        }
        if (zoomStored.x && zoomStored.y) {
          zoomer.pan({ x: zoomStored.x, y: zoomStored.y })
        }
      } else {
        zoomer.pan({ x: 20, y: 20 })
        zoomer.zoomAtPoint(0.9, { x: 0, y: 0 })
      }
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
      if (this.$store.zoomer) {
        this.$store.zoomer.$store = null
        this.$store.zoomer = null
      }
      this.$store.zoom = null
    }
  }
}
</script>

<style>
</style>
