<template>
  <g
    @mouseover="onOver($event)"
    @mouseout="onOut($event)">
    <rect class="group-delta-plus" x="0" y="5" :width="delta.width" height="20" v-if="delta.value > 0"></rect>
    <rect class="group-delta-minus" x="0" y="5" :width="delta.width" height="20" v-else></rect>
    <text :x="delta.width / 2" y="19" class="group-delta-text" text-anchor="middle">{{delta.text}}</text>
  </g>
</template>

<script>
export default {
  name: 'GroupDelta',
  props: {
    order: {
      type: Array,
      default: () => []
    },
    delta: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
  }),
  computed: {
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
.group-delta-text {
  font-size: 10px;
  pointer-events: none;
}
.group-delta-plus {
  fill: #80ff55;
  cursor: pointer;
}
.group-delta-minus {
  fill: #ff5050;
  cursor: pointer;
}
.group-cell-over {
  .group-delta-empty {
    fill: #f7f19b;
  }
  .group-delta-plus {
    fill: #c5ff55;
    //fill: rgba(128, 255, 85, 0.4)
  }
  .group-delta-minus {
    fill: #ff9950;
    // fill: rgba(255, 80, 80, 0.4)
  }
}
</style>
