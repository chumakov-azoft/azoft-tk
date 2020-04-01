<template>
  <g>
    <text :transform="`translate(${position[0]} ${position[1]})`" x="5" y="-10" text-anchor="start" class="group--title">{{groupTitle}}</text>
    <g style="filter:url(#dropshadow)" :transform="`translate(${position[0]} ${position[1]})`" :id="'places-' + index + '-' + index">
      <g>
        <rect class="group" :width="placesWidth" :height="groupHeight"></rect>
        <text x="22" y="22" text-anchor="middle" class="match--rating">#</text>
        <text x="49" y="22" text-anchor="end" class="match--rating">R</text>
        <text :x="showLogo ? 110 : 94" y="22" text-anchor="end" class="match--rating">{{isPairs ? 'Пара' : 'Игрок'}}</text>
        <text :x="placesWidth - 26" y="22" text-anchor="end" class="match--rating">Дельта</text>
        <place v-for="(place, count) in placesCurrent" :key="'place' + place.place"
               :transform="`translate(10 ${count * 30 + 29})`"
               :index="place.place"
               :order="place.order"
               :seed="place.seed"
               :backWidth="placesWidth - 20"
               :backVisible="!(count%2)"
        ></place>
      </g>
    </g>
  </g>
</template>

<script>
import Place from './Place'

export default {
  name: 'Places',
  components: { Place },
  props: {
    index: {
      type: Number,
      default: 0
    },
    position: {
      type: Array,
      default: () => [ 0, 0 ]
    },
    placesWidth: {
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
    stages () { return this.$store.state.info.stages },
    places: function () { return this.$store.state.places[this.stages.length - 1] },
    placesCurrent: function () { return this.places.filter((item) => item.fin === this.index) },
    groupTitle: function () { return 'Победители ' + (this.index + 1) + 'го финала' },
    groupHeight: function () {
      return 30 * this.placesCurrent.length + 37
    },
    nameWidth: function () { return this.$store.state.settings.nameWidth }
  },
  methods: {
    onChangeDeltasWidth (width) {
    },
    onChangeHeight (height) {
    }
  },
  mounted () {
    // console.log(222222, this.begin, this.end, this.places[1])
    // console.log(222222, this.seeds.length, this.groupHeight, this.$store.state.groups[this.order[0]][this.order[1]].position[1])
  }
}
</script>

<style>
</style>
