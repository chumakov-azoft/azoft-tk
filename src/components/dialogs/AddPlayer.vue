<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{playerEdit ? 'Редактировать' : 'Добавить'}} игрока</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="mx-3">
              <v-col cols="12" style="position:relative">

                <v-speed-dial v-if="$store.state.settings.role === 'admin' && $store.state.settings.showLogo && showFields && currentLogo" style="position:absolute;left:-24px; top:32px" class="menu"
                              v-model="showLogos"
                              top
                              left
                              direction="bottom"
                              transition="slide-y-reverse-transition"
                >
                  <template v-slot:activator>
                      <v-img width="25" height="25" :src="logoUrl"></v-img>
                  </template>
                  <v-img v-for="(logo, count) in logos" :key="'logo' + count" width="15" height="15" :src="$store.state.settings.base + logo" class="mb-1" @click="changeLogo(logo)"></v-img>
                </v-speed-dial>

                <v-autocomplete class="search" label="ФИО*" ref="autocomplete"
                                v-model="model"
                                autofocus
                                auto-select-first
                                :loading="loading"
                                :items="playersAll"
                                :search-input.sync="search"
                                :filter="searchFilter"
                                item-text="name"
                                item-value=""
                                hide-details
                                :hide-no-data="playerEdit"
                >
                <template v-slot:no-data>
                  <span class="mx-2">Имя не найдено. <a @click="createPlayer">Добавить нового игрока</a></span>
                </template>
                </v-autocomplete>
              </v-col>
              <!--<v-col cols="12">
                <v-text-field label="ФИО*" required :value="currentName"></v-text-field>
              </v-col>-->
              <v-col cols="12" v-if="showFields">
                <v-text-field label="Рейтинг*" required v-model="currentRating" hint="введите рейтинг" ref="rating"></v-text-field>
              </v-col>
              <v-col cols="12" v-if="showFields">
                <v-text-field
                  v-model="currentLocation"
                  label="Город*"
                  required
                ></v-text-field>
              </v-col>
              <!--
              <v-col cols="12" v-if="showFields">
                <v-text-field :value="showFields.email" label="Email"></v-text-field>
              </v-col>
                              <v-col cols="12" sm="6">
                                <v-select
                                  :items="['0-17', '18-29', '30-54', '54+']"
                                  label="Age*"
                                  required
                                ></v-select>
                              </v-col>
              -->
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red dark" dark text @click="deletePlayer" ref="remove" v-if="playerEdit">Удалить</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue dark" dark text @click="savePlayer" ref="add" v-if="showFields">{{saveButtonMessage}}</v-btn>
          <v-btn color="blue dark" dark text @click="closeDialog">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      class="alert"
      v-model="showAlert"
      :timeout="2500"
      :color="playerEdit ? 'yellow' : 'blue'"
      dark dense
      icon="mdi-account"
      transition="scroll-y-reverse-transition"
    >{{snackbarMessage}}
    </v-snackbar>
  </v-row>
</template>

<script>
import { AxiosInstance as axios } from 'axios'
export default {
  name: 'AddPlayer',
  components: { },
  props: {
  },
  data: () => ({
    items: [],
    model: [],
    search: null,
    loading: false,
    showFields: false,
    currentRating: 0,
    currentLocation: '',
    currentLogo: '',
    showLogos: false,
    showAlert: false,
    showAlertName: null,
    oldPlayerName: '',
    oldKeyDown: null
  }),
  watch: {
    showDialog (val) {
      if (val) {
        this.oldKeyDown = document.onkeydown
        document.onkeydown = this.onKeyDown
        setTimeout(() => {
          this.$refs.autocomplete.focus()
        }, 100)
        if (this.playerEdit) {
          this.showFields = true
          const player = this.players[this.playerEditSeed]
          this.currentLocation = player.location
          this.currentRating = player.rating
          this.currentLogo = player.logo
          this.model = player.name
          setTimeout(() => {
            setTimeout(() => this.$refs.rating.focus(), 100)
          })
        }
      } else {
        document.onkeydown = this.oldKeyDown
      }
    },
    model (val) {
      if (val) {
        let player = this.players.find((item) => item.name === val)
        if (player) {
          this.$store.state.edit.addPlayerSeed = this.players.findIndex((item) => item.name === val)
          this.oldPlayerName = player.name
        } else {
          player = this.playersAll.find((item) => item.name === val)
        }
        if (player) {
          setTimeout(() => {
            this.showFields = true
            this.currentLocation = player.location
            this.currentRating = player.rating
            this.currentLogo = player.logo
            setTimeout(() => this.$refs.add.$el.focus())
          })
        }
      }
      // val && val !== this.model && this.querySelections(val)
    },
    search (val) {
      if (val) {
        if (val.toLowerCase() !== this.searchString) {
          this.search = this.searchString
        }
      }
    }
  },
  computed: {
    logos: function () { return this.$store.state.edit.logos || [] },
    players: function () { return this.$store.state.players },
    playersAll: function () { return this.$store.state.edit.playersAll },
    playerEdit: function () { return this.$store.state.edit.addPlayerSeed !== -1 },
    playerEditSeed: function () { return this.$store.state.edit.addPlayerSeed },
    snackbarMessage: function () { return this.showAlertName + (this.playerEdit ? ' изменён.' : ' добавлен в турнир. ' + this.snackbarTotalMessage) },
    snackbarTotalMessage: function () { return 'Итого уже ' + this.players.length + ' игроков.' },
    saveButtonMessage: function () { return this.playerEdit ? 'Сохранить изменения' : 'Добавить в турнир' },
    logoUrl: function () { return this.$store.state.settings.base + this.currentLogo },
    showDialog: function () { return this.$store.state.edit.addPlayerDialog },
    searchString: function () { return this.formatSearch(this.search).toLowerCase() }
  },
  methods: {
    /* querySelections (v) {
      console.log(1234)
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }, */
    searchFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      return textOne.indexOf(this.searchString) === 0
    },
    changeLogo (logo) {
      this.currentLogo = logo
    },
    createPlayer () {
      this.showFields = true
      this.currentLocation = 'Новосибирская обл., Новосибирск'
      this.currentRating = ''
      this.currentLogo = ''
      this.search = this.search.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
      this.$store.dispatch('createPlayer', { name: this.search, rating: this.currentRating, logo: this.currentLogo, location: this.currentLocation })
      this.model = this.search
      setTimeout(() => {
        this.$refs.autocomplete.blur()
        setTimeout(() => this.$refs.rating.focus(), 100)
      })
    },
    deletePlayer () {
      this.$store.dispatch('deletePlayer', this.playerEditSeed)
      this.closeDialog()
    },
    savePlayer () {
      if (this.playerEdit) {
        this.$store.dispatch('savePlayer', { name: this.search, rating: this.currentRating, logo: this.currentLogo, location: this.currentLocation })
        // update player in allPlayers
        const playerOld = this.playersAll.find((item) => item.name === this.oldPlayerName)
        playerOld.name = this.search
        // update player in players
        const player = this.players[this.playerEditSeed]
        player.name = this.search
        player.location = this.currentLocation
        player.rating = this.currentRating
        player.logo = this.currentLogo
        this.closeDialog()
      } else {
        this.search = this.search.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
        this.$store.dispatch('addPlayer', { name: this.search, rating: this.currentRating, logo: this.currentLogo, location: this.currentLocation })
        this.showAlert = true
        this.showAlertName = this.search
        this.showFields = false
        this.model = ''
        setTimeout(() => this.$refs.autocomplete.focus(), 200)
      }
    },
    closeDialog () {
      this.$store.state.edit.addPlayerDialog = false
      this.showLogos = false
      setTimeout(() => {
        this.$store.state.edit.addPlayerSeed = -1
        this.showFields = false
        this.model = ''
      }, 200)
    },
    formatSearch (str) {
      if (!str) return ''
      const replacer = {
        'q': 'й',
        'w': 'ц',
        'e': 'у',
        'r': 'к',
        't': 'е',
        'y': 'н',
        'u': 'г',
        'i': 'ш',
        'o': 'щ',
        'p': 'з',
        '[': 'х',
        ']': 'ъ',
        'a': 'ф',
        's': 'ы',
        'd': 'в',
        'f': 'а',
        'g': 'п',
        'h': 'р',
        'j': 'о',
        'k': 'л',
        'l': 'д',
        ';': 'ж',
        "'": 'э',
        'z': 'я',
        'x': 'ч',
        'c': 'с',
        'v': 'м',
        'b': 'и',
        'n': 'т',
        'm': 'ь',
        ',': 'б',
        '.': 'ю',
        '/': '.'
      }
      str = str.replace(/[A-z/,.;'[]/g, x => replacer[x])
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
    },
    onKeyDown (e) {
      e = e || window.event
      console.log(e.code)
      if (e.code === 'Enter') {
        if (this.showFields) {
          this.savePlayer()
        } else if (this.search) {
          this.createPlayer()
        }
      } else if (e.code === 'Escape') {
        if (this.showFields && !this.playerEdit) {
          this.model = null
          this.showFields = false
          if (this.$refs.autocomplete) this.$refs.autocomplete.focus()
        } else {
          this.closeDialog()
        }
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
</style>
