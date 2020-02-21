<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-content>

   <silentbox-group>
      <silentbox-item v-for="(media, index) in $store.state.medias" :key="'thumb' + index" :id="'thumb--' + media[6]" class="d-none"
        :src="media[4][0] === '/' ? $store.state.settings.base + media[4] : media[4]" :mid="media[6]"
        :description="media.length ? media[5] : ''" :autoplay="false" :hide-controls="true">
      </silentbox-item>
    </silentbox-group>

    <Zoom @clickMedia="onClick"/>

    <add-player></add-player>

  </v-content>
</template>

<script>
import Zoom from '../components/Zoom'
import AddPlayer from '../components/dialogs/AddPlayer'

export default {
  name: 'home',
  components: {
    Zoom,
    AddPlayer
  },
  props: {
    section: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    fab: false
  }),
  computed: {
    addPlayerDialog: function () { return this.$store.state.edit.addPlayerDialog }
  },
  methods: {
    onClick (id) {
      const thumb = document.querySelector('#thumb--' + id)
      if (thumb) {
        thumb.click()
      }
    }
  },
  mounted () {
    this.$store.commit('initialize', this.section)
    document.onkeydown = (e) => {
      if (this.addPlayerDialog) return
      e = e || window.event
      console.log(e.code)
      if (e.code.indexOf('Digit') === 0 && e.key < 10 && e.key >= 0) {
        this.$store.state.edit.type === 'group' ? this.$store.dispatch('setGroupResult', +e.key) : this.$store.dispatch('setMatchResult', +e.key)
      } else if (e.code === 'KeyR') {
        this.$store.state.edit.type === 'group' ? this.$store.dispatch('setGroupReady') : this.$store.dispatch('setMatchReady')
      } else if (e.code === 'KeyT') {
        this.$store.state.edit.type === 'group' ? this.$store.dispatch('setGroupResult', 'Tex') : this.$store.dispatch('setMatchResult', 'Tex')
      } else if (e.code === 'Space') {
        this.$store.state.edit.type === 'group' ? this.$store.dispatch('setGroupProgress') : this.$store.dispatch('setMatchProgress')
      } else if (e.code === 'Backspace') {
        this.$store.state.edit.type === 'group' ? this.$store.dispatch('deleteGroupResult') : this.$store.dispatch('deleteMatchResult')
      } else if (e.code === 'ArrowLeft') {
        this.$store.dispatch('moveObjects', { dx: e.shiftKey ? -10 : -1, dy: 0 })
      } else if (e.code === 'ArrowRight') {
        this.$store.dispatch('moveObjects', { dx: e.shiftKey ? 10 : 1, dy: 0 })
      } else if (e.code === 'ArrowUp') {
        this.$store.dispatch('moveObjects', { dy: e.shiftKey ? -10 : -1, dx: 0 })
      } else if (e.code === 'ArrowDown') {
        this.$store.dispatch('moveObjects', { dy: e.shiftKey ? 10 : 1, dx: 0 })
      } else if (e.code === 'Escape') {
        this.$store.state.edit.itemsToMove = []
      } else if (e.code === 'KeyC' && e.altKey) {
        this.$store.dispatch('clearStorage')
      } else if (e.code === 'KeyA' && e.altKey) {
        this.$store.dispatch('switchRole')
      } else if (e.code === 'KeyA') {
        this.$store.state.edit.addPlayerDialog = true
      } else if (e.code === 'KeyZ' && e.ctrlKey && e.altKey) {
        this.$store.dispatch('restoreFromStorage')
      } else if ((e.code === 'KeyS') && e.altKey && e.ctrlKey) {
        this.$store.dispatch('saveAllResults')
      } else if ((e.code === 'KeyS') && e.altKey) {
        this.$store.dispatch('saveResults')
      } else if ((e.code === 'KeyF') && e.altKey) {
        this.$store.dispatch('saveFiles')
      } else if (e.code === 'KeyL' && e.altKey) {
        console.log(this.$route.name)
        if (this.$route.name === 'home') {
          localStorage.githubToken = ''
          this.$router.push('l')
        }
      }
    }
  }
}
</script>

<style lang="scss">
  html { overflow-y: auto !important }
  .menu {
    .v-btn:before {
      background-color: transparent;
    }
  }
</style>
