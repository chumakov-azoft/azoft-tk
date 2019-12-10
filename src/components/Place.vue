<template>
  <g style="filter:url(#dropshadow)" :class="'place--' + place" :id="'player' + seed"
    @mouseout="$store.commit('out', {order, $event})"
    @mouseover="$store.commit('over', {order, $event})">
    <g :transform="`translate(${position[0]} ${position[1]})`">
      <polygon points="7,5 7,25 -5,15" class="place"/>
      <rect class="place" x="5" :width="placeWidth" height="30"></rect>
      <rect class="place--shade" x="35" :width="placeWidth - 64" height="30"></rect>
      <rect class="place--plus" :x="placeWidth - 29" :width="34.1" height="30" v-if="delta > 0"></rect>
      <rect class="place--minus" :x="placeWidth - 29" :width="34.1" height="30" v-if="delta < 0"></rect>
      <text x="19" y="19" width="45" height="12" text-anchor="middle" class="match--rating">{{rating}}</text>
      <text x="71" y="20.5" :width="placeWidth - 90" height="21" text-anchor="middle" class="place--name">{{place + ' место'}}</text>
      <text :x="placeWidth - 13" y="20" width="45" height="21" text-anchor="middle" class="place--delta">{{(delta > 0 ? '+' : '') + delta}}</text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'Place',
  props: {
    order: {
      type: Array,
      default: () => []
    },
    seed: {
      type: Number,
      default: 0
    },
    position: {
      type: Array,
      default: () => [ 0, 0 ]
    },
    rating: {
      type: Number,
      default: 0
    },
    delta: {
      type: Number,
      default: 0
    },
    place: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
  }),
  computed: {
    placeWidth: function () { return 140 }
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
  font-size: 15px;
}
.place--delta {
  font-size: 12px;
  font-weight: 500;
}
</style>
