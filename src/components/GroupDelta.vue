<template>
  <g :id="'group-' + order[0] + '-' + order[1] + '-' + order[2] + '-' + order[3]"
    @mouseover="onOver($event)"
    @mouseout="onOut($event)">
    <rect class="group-delta-plus" x="0" y="5" :width="delta.width" height="20" v-if="delta.win"></rect>
    <rect class="group-delta-minus" x="0" y="5" :width="delta.width" height="20" v-else></rect>
    <text :x="delta.width / 2" y="19" class="group-delta-text" text-anchor="middle">{{delta.text}}</text>
  </g>
</template>

<script>
export default {
  name: 'GroupDelta',
  props: {
    delta: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
  }),
  computed: {
    order: function () { return this.delta.order }
  },
  methods: {
    onOver ($event) {
      // this.delta.isGroup ? this.$store.commit('overGroupCell', { order: this.order, $event }) : this.$store.commit('overMatchCell', { order: this.order, $event })
    },
    onOut ($event) {
      // this.delta.isGroup ? this.$store.commit('outGroupCell', { order: this.order, $event }) : this.$store.commit('outMatchCell', { order: this.order, $event })
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
    fill: #00f9ff;
  }
  .group-delta-plus {
    fill: #00f9ff;
    //fill: rgba(128, 255, 85, 0.4)
  }
  .group-delta-minus {
    fill: #00f9ff;
    // fill: rgba(255, 80, 80, 0.4)
  }
}
</style>
