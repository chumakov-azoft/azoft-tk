<template>
  <g style="filter:url(#dropshadow)">
    <image v-for="(media, index) in $store.state.medias" :key="'icon' + index" :id="'icon--' + media[6]"
           class="medias"
           :href="media[0][0] === '/' ? $store.state.settings.base + media[0] : media[0]"
           :x="media[1]" :y="media[2]" :width="media[3]"
           :title="media.length ? media[5] : ''"
           @click="$event.shiftKey ? onSelect(media) : onClick(media[6])"
    ></image>
  </g>
</template>

<script>
export default {
  name: 'Medias',
  props: {
  },
  data: () => ({
  }),
  watch: {
    medias: {
      immediate: true,
      handler (value, old) {
        console.log('before', old, this.$route.params.media)
        if (this.$route.params.media !== null) {
          setTimeout(() => this.onClick(this.$route.params.media), 500)
        }
      }
    }
  },
  methods: {
    onClick (id) {
      this.$store.state.zoom.$emit('clickMedia', id)
      if (this.$route.params.media !== id) {
        this.$router.replace({ params: { ...this.$route.params, media: id } })
      }
    },
    onSelect (media) {
      this.$store.state.edit.itemsToMove.push(media)
    }
  }
}
</script>

<style>
.medias {
  cursor: pointer;
}
</style>
