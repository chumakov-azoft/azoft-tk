<template>
  <g :transform="`translate(${position[0]} ${position[1]})`" :id="'players-' + order[0] + '-' + index">
    <text x="5" y="-12" text-anchor="start" class="group--title">{{groupTitle}}</text>
    <g>
      <rect class="group" :width="playersWidth" :height="groupHeight"></rect>
      <text x="22" y="22" text-anchor="middle" class="match--rating">#</text>
      <text x="49" y="22" text-anchor="end" class="match--rating">R</text>
      <text :x="showLogo ? 110 : 94" y="22" text-anchor="end" class="match--rating">{{isPairs ? 'Пара' : 'Игрок'}}</text>
      <!--<text :x="playersWidth - 20" y="22" text-anchor="end" class="match&#45;&#45;rating">Рейтинг</text>-->
      <player v-for="(player, seed) in players" :key="'player' + seed" :id="'player' + seed" @changeDeltasWidth="onChangeDeltasWidth"
                  :transform="`translate(10 ${seed * 30 + 29})`"
                  :index="seed"
                  :order="[...order, seed]"
                  :backWidth="playersWidth - 20"
                  :backVisible="!(seed%2)"
      ></player>
      <image v-if="isAdmin" :href="'/img/PlusGreen.svg'" x="-62" y="13" height="42" width="42" class="" @click="$store.state.edit.addPlayerDialog = true"></image>
    </g>
  </g>
</template>

<script>
import Player from './Player'

export default {
  name: 'Players',
  components: { Player },
  props: {
    index: {
      type: Number,
      default: 0
    },
    order: {
      type: Array,
      default: () => []
    },
    position: {
      type: Array,
      default: () => [ 0, 0 ]
    },
    playersWidth: {
      type: Number,
      default: 200
    }
  },
  data: () => ({
    deltasWidth: 80
  }),
  computed: {
    showLogo () { return this.$store.state.settings.showLogo && this.logo },
    isAdmin: function () { return this.$store.state.settings.role === 'admin' },
    isPairs: function () { return this.$store.state.settings.type === 'pairs' },
    players: function () { return this.$store.state.players },
    groupTitle: function () { return 'Игроки' },
    groupHeight: function () {
      this.onChangeHeight(30 * this.players.length + 37)
      return 30 * this.players.length + 37
    },
    nameWidth: function () { return this.$store.state.settings.nameWidth }
  },
  methods: {
    onChangeDeltasWidth (width) {
      this.deltasWidth = Math.max(this.deltasWidth, width)
      this.$store.state.settings.playersWidth = 100 + 90 + this.deltasWidth + (this.isAdmin ? 60 : 0)
    },
    onChangeHeight (height) {
      this.$store.state.settings.playersHeight = height
      this.$store.state.settings.playersPosition[1] = this.$store.state.settings.groupsRowHeight[0] / 2 - height / 2
    }
  },
  mounted () {
    // console.log(222222, this.seeds.length, this.groupHeight, this.$store.state.groups[this.order[0]][this.order[1]].position[1])
  }
}
</script>

<style>
.group {
  fill: #ffffff;
}
</style>
