<template>
  <g style="filter:url(#dropshadow)" :status="status" :id="'match-' + order[0] + '-' + order[1] + '-' + order[2]">
    <g :transform="`translate(${position[0]} ${position[1] + (single ? 15 : 0)})`" :class="single ? 'clipHalf' : 'clipMatch'">
      <half
        :id="'player' + seeds[0]"
        :class="{winner: (finished && win1) || (single && !empty)}"
        :index="index * 2"
        :seed="seeds[0]"
        :order="order.concat(0)"
        :single="single"
      ></half>
      <half
        v-if="!single"
        :id="'player' + seeds[1]"
        :class="{winner: finished && win2}"
        :index="index * 2 + 1"
        :seed="seeds[1]"
        :order="order.concat(1)"
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
    index: {
      type: Number,
      default: 0
    },
    order: {
      type: Array,
      default: () => []
    },
    seeds: {
      type: Array,
      default: () => []
    },
    position: {
      type: Array,
      default: () => [ 0, 0 ]
    }
  },
  data: () => ({
  }),
  computed: {
    status: function () { return this.$store.state.scores[this.order[0]][this.order[1]][this.order[2]][2] },
    empty: function () { return this.status === '' },
    finished: function () { return this.status === 'win1' || this.status === 'win2' },
    status1: function () { return this.status === 'ready2' ? '' : this.status },
    status2: function () { return this.status === 'ready1' ? '' : this.status },
    sign: function () { return this.delta > 0 ? '+' : '-' },
    single: function () { return this.seeds[0] === -1 || this.seeds[1] === -1 },
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
