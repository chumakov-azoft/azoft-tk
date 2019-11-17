<template>
  <SvgPanZoom
    class="championHighlight overHighlight"
    style="width: 100%; height: 100%; user-select: none;"
    @svgpanzoom="registerSvgPanZoom"
    @dblclick="onDoubleClick"
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
        <g v-for="(games, index) in matches" :key="index" :transform1="`translate(${index * 270} 0)`">
          <match v-for="(game, count) in games" :key="index + '.' + count" :transform1="`translate(0 ${count * 80})`" v-if="game"
                 :seeds="game.seeds"
                 :order="{index, count}"
                 :names="game.names"
                 :logos="game.logos"
                 :position="game.position"
                 :ratings="game.ratings"
                 :scores="game.scores"
                 :status="game.status"
          ></match>
        </g>
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
export default {
  components: { SvgPanZoom, Match },
  data: () => ({
    visible: false,
    hammer: null,
    options: {
      // Halt all touch events
      haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],

      // Init custom events handler
      init: function (options) {
        var instance = options.instance
        var initialScale = 1
        var pannedX = 0
        var pannedY = 0
        // Init Hammer
        this.hammer = Hammer(options.svgElement, {
          inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
        })

        // Enable pinch
        this.hammer.get('pinch').set({ enable: true })

        // Handle double tap
        this.hammer.on('doubletap', function (ev) {
          instance.updateBBox()
          instance.resize()
          instance.fit()
          instance.center()
        })

        // Handle pan
        this.hammer.on('panstart panmove', function (ev) {
          // On pan start reset panned variables
          if (ev.type === 'panstart') {
            pannedX = 0
            pannedY = 0
          }
          // Pan only the difference
          instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY })
          pannedX = ev.deltaX
          pannedY = ev.deltaY
        })
        // Handle pinch
        this.hammer.on('pinchstart pinchmove', function (ev) {
          // On pinch start remember initial zoom
          if (ev.type === 'pinchstart') {
            initialScale = instance.getZoom()
            instance.zoomAtPoint(initialScale * ev.scale, { x: ev.center.x, y: ev.center.y })
          }
          instance.zoomAtPoint(initialScale * ev.scale, { x: ev.center.x, y: ev.center.y })
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
    curves () {
      return this.$store.state.curves
    }
  },
  methods: {
    registerSvgPanZoom (zoom) {
      this.$store.zoom = zoom
      if (localStorage['zoom'] && localStorage['zoom'].x) {
        zoom.pan({ x: localStorage['zoom'].x, y: localStorage['zoom'].y })
      } else {
        setTimeout(() => {
          console.log(this.$store.zoom.getSizes().viewBox, this.$store.zoom.getSizes().realZoom)
          this.$store.zoom.pan({ x: 20, y: 20 })
          this.$store.zoom.zoomAtPoint(0.9, { x: 0, y: 0 })
          this.visible = true
        })
      }
    },
    onDoubleClick () {
      console.log(123333)
    }
  },
  beforeDestroy () {
    console.log(1111)
  }
}
</script>

<style>
</style>
