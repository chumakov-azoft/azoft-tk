<template>
  <g :class="{empty: empty}"
    @mouseout="(!empty || isAdmin)  && $store.commit('out', {order, $event})"
    @mouseover="(!empty || isAdmin) && $store.commit('over', {order, $event})"
    @click="$store.commit('click', {order, $event})">
    <rect class="player" :width="matchWidth" height="30"></rect>
    <rect class="player--shade" x="35" :width="matchWidth - (single ?  34 : 69)" height="30"></rect>
    <rect class="player--chevron" width="6" height="30" :fill="chevron"></rect>
    <image :href="logo" x="42.5" y="6.5" height="18" width="18" v-if="showLogo"></image>
    <text x="20" y="19" text-anchor="middle" class="match--rating" v-if="!empty">{{rating}}</text>
    <text x="20" y="19" text-anchor="middle" class="match--hint-place" v-if="empty && hintPlace">{{hintPlace}}</text>
    <text :x="showLogo ? 65 : 45" y="21" class="match--name" v-if="!empty">{{name}}</text>
    <text x="45" y="19" class="match--hint" v-if="empty && hint">{{hint}}</text>
    <text :x="matchWidth - 18" y="21" text-anchor="middle" class="match--result" v-if="started">{{score}}</text>
  </g>
</template>

<script>
export default {
  name: 'Half',
  components: { },
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
    single: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  }),
  computed: {
    empty: function () { return this.status === '' },
    rule: function () { return this.$store.state.settings.rule[0] },
    ruleGroup: function () { return this.rule[this.index][0] },
    rulePlace: function () { return this.rule[this.index][1] },
    hint: function () { return this.order[0] === 1 && this.order[1] === 0 ? 'место в группе ' + this.ruleGroup : '' },
    hintPlace: function () { return this.order[0] === 1 && this.order[1] === 0 ? this.rulePlace + 'е' : '' },
    players: function () { return this.$store.state.players },
    player: function () { return this.seed === -1 || this.seed >= this.players.length ? this.defaultPlayer : this.players[this.seed] },
    logo: function () { return this.player.logoUrl },
    name: function () { return this.player.short },
    deltas: function () { return this.$store.state.deltas[this.order[0]][this.seed] },
    currentDelta: function () { return this.deltas ? this.deltas.find((item) => item.order[1] === this.order[1] && item.order[2] === this.order[2]) : null },
    lastRating: function () { return this.$store.getters.getDeltaRating(this.single ? 0 : this.order[0], this.seed) },
    rating: function () { return this.currentDelta ? this.currentDelta.rating - this.currentDelta.value : this.lastRating },
    matchStatus: function () { return this.$store.state.scores[this.order[0]][this.order[1]][this.order[2]][2] },
    status: function () { return this.order[3] ? (this.matchStatus === 'ready1' ? '' : this.matchStatus) : (this.matchStatus === 'ready2' ? '' : this.matchStatus) },
    score: function () { return this.$store.state.scores[this.order[0]][this.order[1]][this.order[2]][this.order[3]] },
    started: function () { return this.status && this.status.indexOf('ready') === -1 },
    finished: function () { return this.status === 'win1' || this.status === 'win2' },
    sign: function () { return this.delta > 0 ? '+' : '-' },
    matchWidth: function () { return this.$store.state.settings.matchWidth },
    showLogo: function () { return this.$store.state.settings.showLogo && !this.empty && this.logo },
    chevron: function () { return this.status === '' ? this.$store.state.settings.defaultChevronColor : this.$store.state.colors[this.seed] },
    isAdmin () { return this.$store.state.settings.role === 'admin' }
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
.match--hint {
  font-size: 12px;
  opacity: 0.5;
}
.match--hint-place {
  font-size: 12px;
  opacity: 0.5;
}
.match--delta {
  font-size: 8px;
}
</style>
