<template>
  <g :transform="`translate(${position[0]} ${position[1]})`" style="filter:url(#dropshadow)" :id="'group-' + order[0] + '-' + index">
    <defs>
      <clipPath :id="'group' + index"><rect x="0" y="0" :width="groupWidth" :height="groupHeight" rx="5" ry="5"></rect></clipPath>
    </defs>
    <g :style="'clipPath:url(#group' + index + ')'">
      <rect class="group" :width="groupWidth" :height="groupHeight"></rect>
      <text x="22" y="22" text-anchor="middle" class="match--rating">#</text>
      <text x="49" y="22" text-anchor="end" class="match--rating">R</text>
      <text x="90" y="22" text-anchor="end" class="match--rating">Пара</text>
      <text :x="seeds.length * 30 + this.$store.state.settings.nameWidth + 117" y="22" text-anchor="end" class="match--rating">Очки</text>
      <text :x="seeds.length * 30 + this.$store.state.settings.nameWidth + 110 + this.deltasWidth / 2" y="22" text-anchor="start" class="match--rating">Дельта</text>
      <text :x="seeds.length * 30 + this.$store.state.settings.nameWidth + 164 + this.deltasWidth" y="22" text-anchor="end" class="match--rating">Место</text>
      <text v-for="(seed, count) in seeds" :key="'groupKey' + count" :x="$store.state.settings.nameWidth + 97 + 30 * count" y="22" text-anchor="end" class="match--rating">{{count + 1}}</text>
      <group-line v-for="(seed, count) in seeds" :key="'groupLine' + count" :id="'player' + seed" @changeDeltasWidth="onChangeDeltasWidth"
                  :transform="`translate(10 ${count * 30 + 29})`"
                  :index="count"
                  :seeds="seeds"
                  :order="[...order, count]"
                  :backWidth="groupWidth - 20"
                  :backVisible="!(count%2)"
      ></group-line>
    </g>
  </g>
</template>

<script>
import GroupLine from './GroupLine'
export default {
  name: 'Group',
  components: { GroupLine },
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
    deltasWidth: 40
  }),
  computed: {
    groupWidth: function () { return this.$store.state.settings.nameWidth + 100 + 30 * this.seeds.length + 80 + this.deltasWidth },
    groupHeight: function () { return 30 * this.seeds.length + 37 }
  },
  methods: {
    onChangeDeltasWidth (width) {
      this.deltasWidth = Math.max(this.deltasWidth, width)
    }
  }
}
</script>

<style>
.group {
  fill: #ffffff;
}
</style>
