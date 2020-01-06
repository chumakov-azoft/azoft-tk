<template>
  <g>
    <rect class="group-player-shade" :width="backWidth" height="30" v-if="backVisible"></rect>
    <rect class="group-player" :width="nameWidth + 70" height="30"></rect>
    <rect class="group-player-end" :x="tableAndNameWidth" :width="Math.max(1, backWidth - tableAndNameWidth)" height="30"></rect>
    <image :href="logo" x="42.5" y="6.5" height="18" width="18" v-if="showLogo"></image>
    <text x="12" y="19" text-anchor="middle" class="group-player-order">{{order[2] + 1}}</text>
    <text x="36" y="19" text-anchor="middle" class="group-player-rating">{{rating}}</text>
    <text :x="showLogo ? 75 : 55" y="21" :textLength="stretchNames ? nameWidth : 0" class="group-player-name">{{name}}</text>
    <g :transform="`translate(${nameWidth + 70} 0)`">
      <group-cell v-for="seed2 in seeds" :key="'groupCell' + seed2" :id="'group-' + seed + '-' + seed2" class="group-cell"
                  :transform="`translate(${seed2 * 30} 0)`"
                  :order="[...order, seed2]"
      ></group-cell>
    </g>
    <text :x="tableAndNameWidth + 35" y="21" width="45" height="21" text-anchor="middle" class="group-player-score">{{total}}</text>
    <g :transform="`translate(${tableAndNameWidth + 50} 0)`">
      <group-delta v-for="(delta, count) in deltas" :key="'groupDelta' + count" :id="'group-' + seed + '-' + delta.seed2" class="group-delta"
                   :transform="`translate(${delta.x + 8} 0)`"
                   :order="[...order, delta.seed2]"
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
  }),
  computed: {
    version: function () { return this.$store.state.version },
    result: function () { return this.$store.state.scores[this.order[0]][this.order[1]][this.order[2]] },
    seed: function () { return this.order[2] },
    rating: function () { return this.$store.state.players[this.seed].rating },
    logo: function () { return this.$store.state.players[this.seed].logo },
    name: function () { return this.$store.state.players[this.seed].short },
    nameWidth: function () { return this.$store.state.settings.nameWidth },
    tableWidth: function () { return this.seeds.length * 30 },
    tableAndNameWidth: function () { return this.tableWidth + this.nameWidth + 60 },
    total: function () {
      return this.result.reduce((acc, item) => (item ? (item[2] === 'win1' ? acc + 2 : item[2] === 'win2' ? acc + 1 : acc) : acc), 0)
    },
    deltas: function () {
      let sum = 0
      const e = this.result.map((item, index) => {
        if (item && (item[2] === 'win1' || item[2] === 'win2')) {
          const seed2 = this.seeds[index]
          const delta2 = this.getRatingDelta(this.$store.state.players[this.seed].rating, this.$store.state.players[seed2].rating, [item[0], item[1]])
          const delta = Math.round(item[2] === 'win1' ? delta2[0] : delta2[1])
          const deltaS = delta > 0 ? '+' + delta : String(delta)
          return { value: delta, text: deltaS, width: deltaS.length * 5 + 8, time: item[4], seed2: seed2 }
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
    showLogo: function () { return this.$store.state.settings.showLogo && this.logo },
    stretchNames: function () { return this.$store.state.settings.stretchNames },
    place: function () { return this.$store.state.places[this.order[0]][this.order[1]][this.order[2]] || [] },
    chevron: function () { return this.status === '' ? this.$store.state.settings.defaultChevronColor : this.$store.state.colors[this.seed] }
  },
  methods: {
    getRatingDelta (r1, r2, [s1, s2]) {
      if (s1 === s2) return [0, 0]
      const r = Math.abs(s1 - s2)
      const k = r === 1 ? 0.5 : r === 2 ? 0.7 : 1
      const rWin = s1 > s2 ? r1 : r2
      const rLost = s1 < s2 ? r1 : r2
      const d = rWin - rLost
      if (d < 100) {
        const d1 = (10 - (rWin - rLost) / 10) * k
        return [d1, -d1 / 2]
      } else {
        if (r === 2) {
          return [-d / 100 / 2, d / 100]
        } else if (r === 1) {
          return [-d / 20 / 2, d / 20]
        } else {
          return [0, 0]
        }
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
