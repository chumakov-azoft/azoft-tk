<template>
  <g :transform="`translate(${position[0]} ${position[1]})`" :id="'group-row-' + 0">
    <group v-for="(group, count) in (groups[s] || [])" :key="'group' + s + '.' + count"
           :index="group.index"
           :order="group.order"
           :seeds="group.seeds"
           :position="group.position"
           :rowWidth="rowWidth"
           @changeRowWidth="onChangeWidth"
           @changeHeight="onChangeHeight"
    ></group>
  </g>
</template>

<script>
import Group from './Group'
export default {
  name: 'GroupRow',
  components: { Group },
  props: {
    s: {
      type: Number,
      default: 0
    },
    position: {
      type: Array,
      default: () => [ 0, 0 ]
    }
  },
  data: () => ({
  }),
  computed: {
    rowWidth: function () { return this.$store.state.settings.groupsRowWidth[this.s][0] || 750 },
    groups () { return this.$store.state.groups }
  },
  methods: {
    onChangeWidth (width) {
    },
    onChangeHeight (height) {
    }
  }
}
</script>

<style>
.group {
  fill: #ffffff;
}
</style>
