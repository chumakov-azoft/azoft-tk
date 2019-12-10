<template>
  <g :class="{empty: empty}"
    @mouseout="!empty && $store.commit('out', {order, $event})"
    @mouseover="!empty && $store.commit('over', {order, $event})"
    @click="$store.commit('click', {order, $event})">
    <rect class="player" :width="matchWidth" height="30"></rect>
    <rect class="player--shade" x="35" :width="matchWidth - (single ?  34 : 69)" height="30"></rect>
    <rect class="player--chevron" width="6" height="30" :fill="chevron"></rect>
    <image :href="logo" x="42.5" y="6.5" height="18" width="18" v-if="showLogo"></image>
    <text x="19" y="19" width="45" height="12" text-anchor="middle" class="match--rating" v-if="!empty">{{rating}}</text>
    <text :x="showLogo ? 65 : 45" y="21" :width="matchWidth - 90" height="21" class="match--name" v-if="!empty">{{name}}</text>
    <text :x="matchWidth - 18" y="21" width="45" height="21" text-anchor="middle" class="match--result" v-if="started">{{score}}</text>
  </g>
</template>

<script>
export default {
  name: 'Half',
  components: { },
  props: {
    order: {
      type: Array,
      default: () => []
    },
    seed: {
      type: Number,
      default: 0
    },
    logo: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    score: {
      type: [Number, String],
      default: 3
    },
    rating: {
      type: [Number, String],
      default: 300
    },
    status: {
      type: String,
      default: ''
    }
  },
  data: () => ({
  }),
  computed: {
    empty: function () { return this.status === '' },
    started: function () { return this.status && this.status.indexOf('ready') === -1 },
    finished: function () { return this.status === 'win1' || this.status === 'win2' },
    sign: function () { return this.delta > 0 ? '+' : '-' },
    single: function () { return this.status === 'single' },
    matchWidth: function () { return this.$store.state.settings.matchWidth },
    showLogo: function () { return this.$store.state.settings.showLogo && !this.empty && this.logo },
    chevron: function () { return this.status === '' ? this.$store.state.settings.defaultChevronColor : this.$store.state.colors[this.seed] }
  }
}
</script>

<style lang="scss">
.championsHighlight .place--1 .player {
  fill: #fff663;
}
.championsHighlight .place--2 .player {
  fill: #e8e8e8;
}
.championsHighlight .place--3 .player {
  fill: #ffcd99;
}
.overHighlight .over .player {
  fill: #80ff55;
}
.player {
  fill: #ffffff;
  cursor: pointer;
  will-change: fill;
  transition: fill .2s ease-in-out;
}
.empty .player {
  cursor: default;
}
.winner {
  .match--rating, .match--name, .match--result {
    font-weight: 500;
  }
}
.player--shade, .match--rating, .match--name, .match--result, .player--chevron {
  pointer-events: none;
}
.player--shade {
  fill: rgba(0,0,0,0.04);
}
.match--rating {
  font-size: 10px;
}
.match--delta {
  font-size: 8px;
}
</style>
