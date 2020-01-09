<template>
  <g :transform="`translate(${position[0]} ${position[1]})`" style="filter:url(#dropshadow)" :id="'group-row-' + 0">
    <group v-for="(group, count) in (groups[s] || [])" :key="'group' + s + '.' + count"
           :index="group.index"
           :order="group.order"
           :seeds="group.seeds"
           :position="group.position"
           :rowWidth="rowWidth"
           @changeRowWidth="onChangeWidth"
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
    deltasWidth: 40,
    rowWidth: 750
  }),
  computed: {
    nameWidth: function () { return this.$store.state.settings.nameWidth },
    groups () { return this.$store.state.groups }
  },
  methods: {
    onChangeWidth (width) {
      this.rowWidth = Math.max(this.rowWidth, width)
    }
  }
}
</script>

<style>
.group {
  fill: #ffffff;
}
</style>
