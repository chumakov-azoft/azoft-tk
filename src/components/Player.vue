<template>
  <g :class="placeClass" @click="editPlayer">
    <rect class="group-player-shade" :width="backWidth" height="30" v-if="backVisible"></rect>
    <rect v-if="seed >= 0" class="group-player" :width="backWidth" height="30"></rect>
    <text x="12" y="19" text-anchor="middle" class="group-player-order">{{index + 1}}</text>
    <text v-if="seed >= 0" x="36" y="19" text-anchor="middle" class="group-player-rating">{{rating}}</text>
    <image v-if="seed >= 0 && showLogo" :href="logo" x="57" y="6.5" height="18" width="18"></image>
    <text v-if="seed >= 0" :x="showLogo ? 80 : 57" y="21" :textLength="stretchNames ? nameWidth : null" class="group-player-name">{{name}}</text>
    <g v-if="seed >= 0" :transform="`translate(${nameWidth + 50} 0)`">
      <group-delta v-for="(delta, count) in deltas" :key="'groupDelta' + count" class="group-delta"
                   :transform="`translate(${delta.x + 8} 0)`"
                   :order="[...order, delta.index]"
                   :delta = delta
      ></group-delta>
    </g>
    <text :x="backWidth - 25" y="21" text-anchor="middle" class="group-player-place" v-if="place.length === 1">{{place[0]}}</text>
    <text :x="backWidth - 25" y="21" text-anchor="middle" class="group-player-range" v-if="place.length === 2">{{place[0] + '..' + place[1]}}</text>
  </g>
</template>

<script>
import GroupDelta from './GroupDelta'

export default {
  name: 'Player',
  components: { GroupDelta },
  props: {
    index: {
      type: Number,
      default: 0
    },
    order: {
      type: Array,
      default: () => []
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
    defaultPlayer: { short: 'Записывайтесь!', rating: 0, logo: '/img/PlusGreen.svg', click: true }
  }),
  computed: {
    players () { return this.$store.state.players },
    player () { return this.seed === -1 || this.seed >= this.players.length ? this.defaultPlayer : this.players[this.seed] },
    seed () { return this.index },
    rating () { return this.player.rating },
    logo () { return this.player.logoUrl },
    name () { return this.player.short2 },
    nameWidth () { return this.$store.state.settings.nameWidth },
    isAdmin () { return this.$store.state.settings.role === 'admin' },
    showLogo () { return this.$store.state.settings.showLogo && this.logo },
    stretchNames () { return this.$store.state.settings.stretchNames },
    result () { return [] },
    deltas () {
      let sum = 0
      const e = this.result.map((item, index) => {
        if (item && (item[2] === 'win1' || item[2] === 'win2')) {
          const seed2 = this.seeds[index]
          const delta2 = this.$store.getters.getRatingDelta(this.player.rating, this.$store.state.players[seed2].rating, [item[0], item[1]])
          const delta = Math.round(item[2] === 'win1' ? delta2[0] : delta2[1])
          const deltaS = delta > 0 ? '+' + delta : String(delta)
          return { value: delta, text: deltaS, width: deltaS.length * 5 + 8, time: item[4], seed2: seed2, index: index }
        }
        return null
      }).filter(Boolean).sort((a, b) => {
        return a.time - b.time
      }).map(item => {
        // console.log(sum)
        item.x = sum
        sum += item.width + 4
        return item
      })
      this.$emit('changeDeltasWidth', sum)
      return e
    },
    place () { return [] },
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
    editPlayer () {
      if (this.isAdmin) {
        this.$store.state.edit.addPlayerDialog = true
        this.$store.state.edit.addPlayerSeed = this.seed
      }
    },
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
  fill: #e8e8e8;
}
.championsHighlight .place--3 .group-player, .championsHighlight .place--3 .group-player-end {
  fill: #ffcd99;
}
.overHighlight .over .group-player {
  fill: #80ff55;
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
