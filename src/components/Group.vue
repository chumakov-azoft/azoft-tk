<template>
  <g>
    <text :transform="`translate(${position[0]} ${position[1]})`" x="5" y="-12" text-anchor="start" class="group--title">{{groupTitle}}</text>
    <g style="filter:url(#dropshadow)" :transform="`translate(${position[0]} ${position[1]})`" :id="'group-' + order[0] + '-' + index">
      <defs>
        <clipPath :id="'group' + order[0] + '-' + index"><rect x="0" y="0" :width="rowWidth" :height="groupHeight" rx="5" ry="5"></rect></clipPath>
      </defs>
      <g :style="'clipPath:url(#group' + order[0] + '-' + index + ')'">
        <rect class="group" :width="rowWidth" :height="groupHeight"></rect>
        <text x="22" y="22" text-anchor="middle" class="match--rating">#</text>
        <text x="49" y="22" text-anchor="end" class="match--rating">R</text>
        <text :x="showLogo ? 100 : 94" y="22" text-anchor="end" class="match--rating">{{isPairs ? 'Пара' : 'Игрок'}}</text>
        <text :x="seeds.length * 30 + nameWidth + 117" y="22" text-anchor="end" class="match--rating">Очки</text>
        <text :x="seeds.length * 30 + nameWidth + 120 + this.deltasWidth / 2" y="22" text-anchor="start" class="match--rating">Дельта</text>
        <text :x="rowWidth - 20" y="22" text-anchor="end" class="match--rating">Место</text>
        <text v-for="(seed, count) in seeds" :key="'groupKey' + count" :x="nameWidth + 97 + 30 * count" y="22" text-anchor="end" class="match--rating">{{count + 1}}</text>
        <group-line v-for="(seed, count) in seeds" :key="'groupLine' + count" :id="'player' + seed" @changeDeltasWidth="onChangeDeltasWidth"
                    :transform="`translate(10 ${count * 30 + 29})`"
                    :index="count"
                    :seeds="seeds"
                    :order="[...order, count]"
                    :backWidth="rowWidth - 20"
                    :backVisible="!(count%2)"
                    :deltasWidth="deltasWidth"
        ></group-line>
      </g>
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
    },
    rowWidth: {
      type: Number,
      default: 200
    }
  },
  data: () => ({
    deltasWidth: 50
  }),
  computed: {
    showLogo () { return this.$store.state.settings.showLogo },
    isPairs: function () { return this.$store.state.settings.type === 'pairs' },
    groupTitle: function () { return this.$store.state.mesh[this.order[0]][this.order[1]][4] },
    groupHeight: function () { return 30 * this.seeds.length + 37 },
    nameWidth: function () { return this.$store.state.settings.nameWidth }
  },
  methods: {
    onChangeDeltasWidth (width) {
      this.deltasWidth = Math.max(this.deltasWidth, width)
      this.$emit('changeRowWidth', this.$store.state.settings.nameWidth + 100 + 30 * this.seeds.length + 90 + this.deltasWidth)
    }
  },
  mounted () {
    // console.log(222222, this.seeds.length, this.groupHeight, this.$store.state.groups[this.order[0]][this.order[1]].position[1])
    if (this.$store.state.groups[this.order[0]].length > this.order[1] + 1) {
      // console.log(this.groupHeight)
      this.$store.state.groups[this.order[0]][this.order[1] + 1].position[1] = Math.max(this.$store.state.groups[this.order[0]][this.order[1] + 1].position[1], this.position[1] + this.groupHeight + 45)
    } else {
      this.$emit('changeHeight', this.position[1] + this.groupHeight + 15)
    }
  }
}
</script>

<style>
</style>
