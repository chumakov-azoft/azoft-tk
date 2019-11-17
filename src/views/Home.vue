<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-content>

    <v-speed-dial v-if="$store.state.settings.role === 'admin'" style="position:absolute;z-index:1" class="menu"
                  v-model="fab"
                  elevation="10"
                  top
                  right
                  direction="left"
                  transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          fab
          small
          elevation="5"
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        small
        elevation="5"
        @click.stop="onClick"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        elevation="5"
        @click.stop="onClick"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        elevation="5"
        @click.stop="onClick"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>

    <Zoom/>

  </v-content>
</template>

<script>
import Zoom from '../components/Zoom'

export default {
  name: 'home',
  components: {
    Zoom
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
  methods: {
    onClick () {
      console.log(1111)
    }
  },
  mounted () {
    this.$store.commit('initialize', this.section)
    document.onkeydown = (e) => {
      e = e || window.event
      console.log(e.key)
      if (e.key < 10 && e.key >= 0) {
        this.$store.dispatch('setMatchResult', +e.key)
      } else if (e.key === 't' || e.key === 'е') {
        this.$store.dispatch('setMatchResult', 'Tex')
      } else if (e.key === 'ArrowLeft') {
        this.$store.dispatch('moveMatches', { dx: e.shiftKey ? -10 : -1, dy: 0 })
      } else if (e.key === 'ArrowRight') {
        this.$store.dispatch('moveMatches', { dx: e.shiftKey ? 10 : 1, dy: 0 })
      } else if (e.key === 'ArrowUp') {
        this.$store.dispatch('moveMatches', { dy: e.shiftKey ? -10 : -1, dx: 0 })
      } else if (e.key === 'ArrowDown') {
        this.$store.dispatch('moveMatches', { dy: e.shiftKey ? 10 : 1, dx: 0 })
      } else if (e.key === 'c' && e.altKey) {
        this.$store.dispatch('clearStorage')
      } else if (e.key === 'a' && e.altKey) {
        this.$store.dispatch('restoreFromStorage')
      } else if (e.key === 's' && e.altKey && e.ctrlKey) {
        this.$store.dispatch('saveFiles')
      } else if (e.key === 's' && e.altKey) {
        this.$store.dispatch('saveResults')
      } else if (e.key === 'l' && e.altKey) {
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
  .menu {
    .v-btn:before {
      background-color: transparent;
    }
  }
</style>
