<template>
  <g :class="'winner place--' + (index + 1)" :id="'player' + seed"
    @mouseout="$store.commit('out', {order, $event})"
    @mouseover="$store.commit('over', {order, $event})">
      <rect class="group-player-shade" :width="backWidth" height="30" v-if="backVisible"></rect>
      <rect v-if="seed >= 0" class="group-player" :width="backWidth" height="30"></rect>
      <rect class="place--plus" :x="placeWidth - 29" :width="44" height="30" v-if="seed >= 0 && delta >= 0"></rect>
      <rect class="place--minus" :x="placeWidth - 29" :width="44" height="30" v-if="seed >= 0 && delta < 0"></rect>
      <text x="12" y="19" text-anchor="middle" class="group-player-order">{{index + 1}}</text>
      <text v-if="seed >= 0" x="36" y="19" text-anchor="middle" class="group-player-rating">{{rating}}</text>
      <image v-if="seed >= 0 && showLogo" :href="logo" x="57" y="6.5" height="18" width="18"></image>
      <text v-if="seed >= 0" :x="showLogo ? 80 : 57" y="21" :textLength="stretchNames ? nameWidth : null" class="place--name">{{name}}</text>
      <text v-if="seed >= 0" :x="placeWidth - 7" y="21" text-anchor="middle" class="place--delta">{{(delta > 0 ? '+' : '') + delta}}</text>
  </g>
</template>

<script>
export default {
  name: 'Place',
  props: {
    index: {
      type: Number,
      default: 0
    },
    order: {
      type: Array,
      default: () => []
    },
    seed: {
      type: Number,
      default: 0
    },
    backVisible: {
      type: Boolean,
      default: true
    },
    backWidth: {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    defaultPlayer: { short: '', rating: '', logo: '', click: false }
  }),
  computed: {
    players () { return this.$store.state.players },
    player () { return this.seed === -1 || this.seed >= this.players.length ? this.defaultPlayer : this.players[this.seed] },
    rating () { return this.deltas[this.deltas.length - 1].rating },
    deltas () {
      return this.seed === -1 ? 0 : this.$store.state.deltas[this.order[0]][this.seed]
    },
    delta () { return this.deltas ? this.deltas[this.deltas.length - 1].rating - this.player.rating : 0 },
    logo () { return this.player.logoUrl },
    name () { return this.player.short2 },
    nameWidth () { return this.$store.state.settings.nameWidth },
    isAdmin () { return this.$store.state.settings.role === 'admin' },
    showLogo () { return this.$store.state.settings.showLogo && this.logo },
    stretchNames () { return this.$store.state.settings.stretchNames },
    placeWidth: function () { return 315 }
  }
}
</script>

<style lang="scss">
.place {
  fill: #ffffff;
  cursor: pointer;
  will-change: fill;
  transition: fill .2s ease-in-out;
}
.place--1 .place {
  fill: #fff663;
}
.place--2 .place {
  fill: #e8e8e8;
}
.place--3 .place {
  fill: #ffcd99;
}
.overHighlight .over .place {
  fill: #80ff55;
}
.place--shade, .place--plus, .place--minus, .place--name, .place--delta {
  pointer-events: none;
}
.place--shade {
  fill: rgba(0,0,0,0.04);
}
.place--plus {
  fill: #80ff55;
}
.place--minus {
  fill: #ff5050;
}
.place--name {
  font-size: 16px;
}
.place--delta {
  font-size: 16px;
}
</style>
