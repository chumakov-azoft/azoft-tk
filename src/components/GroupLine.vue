<template>
  <g :class="placeClass"
     @mouseout="$store.commit('outPlayer', {seed, $event})"
     @mouseover="$store.commit('overPlayer', {seed, $event})">
    <rect class="group-player-shade" :width="backWidth" height="30" v-if="backVisible"></rect>
    <rect v-if="seed >= 0" class="group-player" :width="nameWidth + 70" height="30"></rect>
    <rect v-if="seed >= 0" class="group-player-end" :x="tableAndNameWidth + 10" :width="Math.max(1, backWidth - tableAndNameWidth - 10)" height="30"></rect>
    <text x="12" y="19" text-anchor="middle" class="group-player-order">{{order[2] + 1}}</text>
    <text v-if="seed >= 0" x="36" y="19" text-anchor="middle" class="group-player-rating">{{rating}}</text>
    <image v-if="seed >= 0 && showLogo" :href="logo" x="57" y="6.5" height="18" width="18"></image>
    <text v-if="seed >= 0" :x="showLogo ? 80 : 57" y="21" :textLength="stretchNames ? nameWidth : null" class="group-player-name">{{name}}</text>
    <g :transform="`translate(${nameWidth + 70} 0)`">
      <group-cell v-for="(seed2, count2) in seeds" :key="'groupCell' + count2" :id="'group-' + order[0] + '-' + order[1] + '-' + order[2] + '-' + count2" class="group-cell"
                  :transform="`translate(${count2 * 30} 0)`"
                  :order="[...order, count2]"
      ></group-cell>
    </g>
    <text v-if="seed >= 0" :x="tableAndNameWidth + 35" y="21" text-anchor="middle" class="group-player-score">{{total}}</text>
    <g v-if="seed >= 0" :transform="`translate(${tableAndNameWidth + 50} 0)`">
      <group-delta v-for="(delta, count) in deltas" :key="'groupDelta' + count" class="group-delta"
                   :transform="`translate(${delta.x + 8} 0)`"
                   :delta = delta
      ></group-delta>
    </g>
    <text :x="backWidth - 25" y="21" text-anchor="middle" class="group-player-place" v-if="place.length === 1">{{place[0]}}</text>
    <text :x="backWidth - 25" y="21" text-anchor="middle" class="group-player-range" v-if="place.length === 2">{{place[0] + '..' + place[1]}}</text>
  </g>
</template>

<script>
import GroupCell from './GroupCell'
import GroupDelta from './GroupDelta'
export default {
  name: 'GroupLine',
  components: { GroupCell, GroupDelta },
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
    backWidth: {
      type: Number,
      default: 300
    },
    backVisible: {
      type: Boolean,
      default: true
    },
    deltasWidth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    defaultPlayer: function () { return { short: 'Записывайтесь!', rating: 0, logoUrl: '/img/PlusGreen.svg', click: true } },
    version: function () { return this.$store.state.version },
    players: function () { return this.$store.state.players },
    player: function () { return this.seed === -1 || this.seed >= this.players.length ? this.defaultPlayer : this.players[this.seed] },
    seed: function () { return this.seeds[this.order[2]] },
    rating: function () { return this.player.rating },
    logo: function () { return this.player.logoUrl },
    name: function () { return this.player.short },
    nameWidth: function () { return this.$store.state.settings.nameWidth },
    tableWidth: function () { return this.seeds.length * 30 },
    tableAndNameWidth: function () { return this.tableWidth + this.nameWidth + 60 },
    result: function () { return this.$store.state.scores[this.order[0]][this.order[1]][this.order[2]] },
    total: function () {
      return this.result.reduce((acc, item) => (item ? (item[2] === 'win1' ? acc + 2 : item[2] === 'win2' && item[0] !== 'Tex' ? acc + 1 : acc) : acc), 0)
    },
    deltas () {
      return this.$store.state.deltas[this.order[0]][this.seed]
    },
    showLogo () { return this.$store.state.settings.showLogo && this.logo },
    stretchNames () { return this.$store.state.settings.stretchNames },
    place () { return this.$store.state.places[this.order[0]][this.order[1]][this.order[2]] || [] },
    placeClass () {
      if (this.place.length === 1) {
        const p = this.place[0].toString()
        const arr = p.split('..')
        if (arr[0] === '1') {
          return 'place--1'
        } else if (arr[0] === '2') {
          return 'place--2'
        } else if (arr[0] === '3') {
          return 'place--3'
        }
      }
      return null
    },
    chevron () { return this.status === '' ? this.$store.state.settings.defaultChevronColor : this.$store.state.colors[this.seed] }
  },
  methods: {
    onOver ($event) {
      if (!this.diagonal) this.$store.commit('overGroupCell', { order: this.order, $event })
    },
    onOut ($event) {
      if (!this.diagonal) this.$store.commit('outGroupCell', { order: this.order, $event })
    }
  }
}
</script>

<style lang="scss">
.championsHighlight .place--1 .group-player, .championsHighlight .place--1 .group-player-end {
  fill: #fff663;
}
.championsHighlight .place--2 .group-player, .championsHighlight .place--2 .group-player-end {
  fill: #d2d2d2;
}
.championsHighlight .place--3 .group-player, .championsHighlight .place--3 .group-player-end {
  fill: #ffcd99;
}
.overHighlight .over .group-player {
  fill: #00f9ff;
}
.group-player-name {
  font-size: 16px;
}
.group-player-score, .group-player-place, .group-player-range {
  font-size: 16px;
}
.group-player-range {
  fill: rgba(128, 128, 128, 0.4);
}
.group-player, .group-player-end {
  fill: rgba(255, 255, 255, 0);
  cursor: default;
  will-change: fill;
  transition: fill .2s ease-in-out;
}
.empty .group-player {
  cursor: default;
}
.group-cell, .group-delta {
  * {
    transition: fill .2s ease-in-out;
  }
}
.group-player-shade, .group-player-order, .group-player-rating, .group-player-name, .group-player-order, .group-player-chevron {
  pointer-events: none;
}
.group-player-shade {
  fill: rgba(0,0,0,0.04);
}
.group-player-order, .group-player-rating {
  font-size: 10px;
}
</style>
