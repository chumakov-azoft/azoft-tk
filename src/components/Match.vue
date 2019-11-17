<template>
  <g style="filter:url(#dropshadow)" :status="status">
    <g :transform="`translate(${position[0]} ${position[1] + (single ? 15 : 0)})`" :class="single ? 'clipHalf' : 'clipMatch'">
      <half
        :class="{winner: (finished && win1) || single}"
        :seed="seeds[0]"
        :id="'player' + seeds[0]"
        :order="{...order, p: 0}"
        :logo="logos[0]"
        :name="names[0]"
        :score="scores[0]"
        :rating="ratings[0]"
        :status="status1"
      ></half>
      <half
        v-if="!single"
        :class="{winner: finished && win2}"
        :seed="seeds[1]"
        :id="'player' + seeds[1]"
        :order="{...order, p: 1}"
        :logo="logos[1]"
        :name="names[1]"
        :score="scores[1]"
        :rating="ratings[1]"
        :status="status2"
        :transform="`translate(0 30.5)`"
      ></half>
    </g>
  </g>
</template>

<script>
import Half from './Half'
export default {
  name: 'Match',
  components: { Half },
  props: {
    seeds: {
      type: Array,
      default: () => []
    },
    order: {
      type: Object,
      default: () => {}
    },
    position: {
      type: Array,
      default: () => [ 0, 0 ]
    },
    logos: {
      type: Array,
      default: () => ['', '']
    },
    names: {
      type: Array,
      default: () => ['', '']
    },
    scores: {
      type: Array,
      default: () => [0, 0]
    },
    ratings: {
      type: Array,
      default: () => ['100', '200']
    },
    status: {
      type: String,
      default: ''
    }
  },
  data: () => ({
  }),
  computed: {
    finished: function () { return this.status === 'win1' || this.status === 'win2' },
    status1: function () { return this.status === 'ready2' ? '' : this.status },
    status2: function () { return this.status === 'ready1' ? '' : this.status },
    sign: function () { return this.delta > 0 ? '+' : '-' },
    single: function () { return this.status === 'single' },
    win1: function () { return this.status === 'win1' },
    win2: function () { return this.status === 'win2' },
    matchWidth: function () { return this.$store.state.settings.matchWidth },
    matchHeight: function () { return this.status === 'single' ? this.$store.state.settings.matchHeight / 2 : this.$store.state.settings.matchHeight }
  }
}
</script>

<style>
.clipMatch {
  clip-path: url(#match);
}
.clipHalf {
  clip-path: url(#half);
}
</style>
