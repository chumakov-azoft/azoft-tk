<template>
  <g>
    <text v-for="(text, index) in texts" :key="'text' + index"
           class="texts"
           :style="text[3]"
           :text-anchor="text.length <= 3 ? 'start' : text[4]"
           :x="text[1]" :y="text[2]"
           @click="$event.shiftKey ? onSelect(text) : onClick(index)"
    >{{text[0]}}</text>
<!--
    @mouseover="onOver($event, media[7])"
    @mouseout="onOut($event, media[7])"
-->
  </g>
</template>

<script>
export default {
  name: 'Texts',
  props: {
    texts: Array,
    default: () => []
  },
  data: () => ({
  }),
  methods: {
    onClick (id) {
    },
    onSelect (text) {
      // console.log('onSelect media', media, this.$route.params.media)
      this.$store.state.edit.itemsToMove.push(text)
    }
  }
}
</script>

<style>
</style>
