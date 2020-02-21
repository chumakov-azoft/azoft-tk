import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import git from './plugins/git'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: 1,
    zoom: null,
    zoomer: null,
    settings: {
      base: '',
      type: null,
      stages: ['finals'],
      finalsNum: 1,
      finalsSizes: [10000], // 2 finals, first final is 8 players size
      status: 'edit',
      role: localStorage['role'] || '',
      defaultCurveColor: '#cccccc',
      defaultChevronColor: '#dddddd',
      defaultZoomX: 20,
      defaultZoomY: 20,
      defaultZoomScale: 0.9,
      showLogo: true,
      showPlayers: false,
      showPlaces: false,
      nameWidth: 210,
      shortType: '',
      pairWidth: 300,
      matchWidth: 220,
      matchHeight: 60,
      groupsRowWidth: [0],
      groupsRowHeight: [0],
      playersPosition: [-600, 0],
      stagesPosition: [[0, 0], [0, 0]],
      placesPosition: [[0, 0], [0, 0]],
      playersWidth: 0,
      playersHeight: 0,
      maxScore: 3
    },
    video: {
      audioTime: [],
      audio: [],
      chevrons: [],
      ratings: [],
      logos: [],
      names: [],
      scores: [],
      subtitle: '',
      scoreTime: [0],
      score: ['0 0 0 0 0']
    },
    edit: {
      itemToSwitch: null,
      itemsToMove: [],
      current: [0],
      type: '',
      over: [],
      next: false,
      centeredMatch: 0,
      readyMatches: [],
      playersAll: [],
      addPlayerDialog: false,
      addPlayerSeed: -1,
      logos: []
    },
    save: {
      players: false,
      pairs: false,
      scores: true,
      seeds: true
    },
    debug: {
      localhost: false,
      showEmpty: false
    },
    colors: ['#ff0500', '#0074d9', '#01ff70', '#fff100', '#c200ff', '#00f9ff', '#ff8c00', '#ff00bc', '#003f83', '#B50002', '#019e47', '#a7a400', '#7b009d', '#00969b', '#773b00', '#990063', '#ffcb95', '#e8dd84', '#afff92', '#85e8bd', '#7DA3FF', '#C69CFF', '#FFA9E0', '#e88e81', '#466a83', '#95625d', '#6a9e7f', '#a4a778', '#86639d', '#628f9b', '#a17e5e', '#9f5f7c', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd', '#7fdbff', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd', '#7fdbff', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd'],
    // players: JSON.parse('[{"name":"Казачев Станислав Александрович","location":"Самарская обл., Чапаевск","rating":"638.73"},{"name":"Токарев Александр Алексеевич","location":"Самарская обл., Самара","rating":"667.28"},{"name":"Божко Данила Николаевич","location":"Самара","rating":"572.14"},{"name":"Стешин Михаил Алексеевич","location":"Самарская обл., Самара","rating":"687.74"},{"name":"Бахметьев Валерий Николаевич","location":"Самарская обл., Самара","rating":"655.51"},{"name":"Бурачек Владимир Николаевич","location":"Самарская обл., Кинель","rating":"615.49"},{"name":"Прохоров Александр Николаевич","location":"Самарская обл., Самара","rating":"631.18"},{"name":"Усманов Александр Владимирович","location":"Самарская обл., Самара","rating":"616.32"},{"name":"Ельшов Максим Викторович","location":"Самарская обл., Самара","rating":"629.55"},{"name":"Клушин Анатолий Федорович","location":"Самарская обл., Самара","rating":"560.99"},{"name":"Хуснутдинов Ерлан Георгиевич","location":"Самарская обл., Самара","rating":"627.76"},{"name":"Петров Антон Владимирович","location":"Самарская обл., Самара","rating":"639.99"},{"name":"Коба Александр Владимирович","location":"Самарская обл., Самара","rating":"633.81"},{"name":"Емельянов Андрей Николаевич","location":"Самарская обл., Самара","rating":"599.38"},{"name":"Гурков Дмитрий Анатольевич","location":"Самарская обл., Самара","rating":"585.37"},{"name":"Арапов Александр Алексеевич","location":"Самарская обл., Самара","rating":"584.96"},{"name":"Гусев Андрей Николаевич","location":"Самарская обл., Самара","rating":"543.26"},{"name":"Кузнецов Кирилл Дмитриевич","location":"Самарская обл., Самара","rating":"429.03"},{"name":"Засорёнков Сергей Владимирович","location":"Самарская обл., Самара","rating":"594.59"},{"name":"Леонтьев Алексей Александрович","location":"Самарская обл., Самара","rating":"563.92"},{"name":"Вирюжский Николай Викторович","location":"Самарская обл., Самара","rating":"492.80"},{"name":"Борщевский Юрий Давидович","location":"Самарская обл., Самара","rating":"589.45"},{"name":"Федяев Антон Вадимович","location":"Самарская обл., Самара","rating":"446.67"},{"name":"Ширяев Михаил Викторович","location":"Самарская обл., Самара","rating":"508.35"},{"name":"Гафиатулин Чингиз Тагирович","location":"Самарская обл., Самара","rating":"607.46"},{"name":"Солдаткин Дмитрий Викторович","location":"Самарская обл., Самара","rating":"591.42"},{"name":"Федин Дмитрий Игоревич","location":"Самарская обл., Самара","rating":"437.04"},{"name":"Кравченко Денис Константинов","location":"Самарская обл., Самара","rating":"353.33"},{"name":"Кукорин Марат Алексеевич","location":"Самарская обл., Самара","rating":"515.36"},{"name":"Король Михаил Анатольевич","location":"Самарская обл., Самара","rating":"548.40"},{"name":"Гуленков Олег Витальевич","location":"Самарская обл., Самара","rating":"446.42"},{"name":"Лучкин Вадим Игоревич","location":"Самарская обл., Самара","rating":"558.64"}]'),
    // players: JSON.parse('[{"name":"Добренький Артём Николаевич","location":"Крым, Ялта","rating":"690.48"},{"name":"Чекалов Дмитрий Геннадьевич","location":"Крым, Ялта","rating":"471.74"},{"name":"Груздов Дарион Сергеевич","location":"Крым, Ялта","rating":"481.34"},{"name":"Невский Александр Александрович","location":"Крым, Ялта","rating":"504.61"},{"name":"Широких Тимур Иванович","location":"Крым, Севастополь","rating":"489.13"},{"name":"Груздов Даниэль Сергеевич","location":"Крым, Ялта","rating":"410.87"},{"name":"Ирижепов Сергей Булатович","location":"Екатеринбург","rating":"407.31"},{"name":"Гладунов Александр Витальевич","location":"Крым, Ялта","rating":"376.21"},{"name":"Груздов Сергей Николаевич","location":"Крым, Ялта","rating":"425.73"},{"name":"Калугин Артём Олегович","location":"Крым, Алушта","rating":"223.68"},{"name":"Пичугов Сергей Леонидович","location":"Крым, Алушта","rating":"220.57"},{"name":"Корзанов Михаил Владимирович","location":"Крым, Ялта","rating":"364.81"},{"name":"Марченко Андрей Иванович","location":"Крым, Орлиное","rating":"352.11"},{"name":"Коваль Николай Александрович","location":"Крым, Симферополь","rating":"257.75"},{"name":"Ланье Владимир Георгиевич","location":"Крым, Ялта","rating":"179.72"},{"name":"Атутова Наталья Антоновна","location":"Бурятия, Улан-Удэ","rating":"120.02"}]'),
    // JSON.parse('[{"name":"Юдин Валерий Витальевич","location":"Новосибирская обл., Новосибирск","rating":"511.41"},{"name":"Солдатов Евгений Анатольевич","location":"Новосибирская обл., Новосибирск","rating":"457.05"},{"name":"Ефременко Всеволод Даниилович","location":"Новосибирская обл., Новосибирск","rating":"490.23"},{"name":"Насыбуллов Тимур Ринатович","location":"Новосибирская обл., Новосибирск","rating":"384.38"},{"name":"Колодный Денис Владимирович","location":"Новосибирская обл., Новосибирск","rating":"461.80"},{"name":"Жаринов Алексей Сергеевич","location":"Новосибирская обл., Новосибирск","rating":"329.63"},{"name":"Шинкевич Сергей Анатольевич","location":"Новосибирская обл., Бердск","rating":"416.29"},{"name":"Паньшин Виктор Владимирович","location":"Новосибирская обл, Новосибирск","rating":"399.07"},{"name":"Лущинский Александр Владимирович","location":"Новосибирская обл., Бердск","rating":"290.69"},{"name":"Васильев Алексей Сергеевич","location":"Новосибирская обл., Новосибирск","rating":"302.01"},{"name":"Наумов Дмитрий Николаевич","location":"Новосибирская обл., Новосибирск","rating":"204.96"},{"name":"Свиридов Евгений Юрьевич","location":"Новосибирская обл., Новосибирск","rating":"208.49"},{"name":"Ковалева Екатерина Александровна","location":"Новосибирская обл., Новосибирск","rating":"150.51"},{"name":"Рудых Ярослав Игоревич","location":"Новосибирская обл., Новосибирск","rating":"131.57"},{"name":"Михеев Юрий Викторович","location":"Новосибирская обл., Новосибирск","rating":"126.50"}]'),
    info: {},
    players: [],
    matches: null,
    groups: null,
    places: [],
    scores: [],
    seeds: [],
    medias: [],
    titles: [],
    texts: [],
    mesh: [],
    rule: [],
    deltas: [],
    curves: [],
    curves2: [[], [], []]
  },
  getters: {
    getDeltaRating: (state) => (s, p1) => {
      return getDeltaRating(state, p1, state.deltas[s][p1], s, -1, -1)
    },
    getRatingDelta: (state) => (r1, r2, [s1, s2]) => {
      return getRatingDelta(r1, r2, [s1, s2])
    }
  },
  mutations: {
    initialize (state, section) {
      if (section) {
        if (window.location.hostname.indexOf('localhost') !== -1) {
          state.settings.role = 'admin'
          state.debug.localhost = true
        }
        // const host = !state.debug.localhost ? 'https://akadem.tk/' : '' // local akadem
        const host = !state.debug.localhost ? 'https://azoft.tk/' : '' // local azoft
        // const host = window.location.hostname.indexOf('localhost') !== -1 ? 'https://azoft.tk/' : '' // remote azoft
        // console.log(host)
        // const host = !state.debug.localhost ? 'https://raw.githubusercontent.com/chumakov-azoft/azoft-tk/master/' : ''
        state.settings.base = 'events/' + section + '/'
        const rand = Math.random()
        if (state.settings.role === 'admin') {
          axios.get(host + '/playersLocal.json?v=' + rand).then((response) => {
            state.edit.playersAll = response.data.players.sort((a, b) => {
              return b.rating - a.rating
            })
          })
        }
        Promise.all([
          // axios.get(host + state.settings.base + 'index.json?v=' + rand),
          axios.get(host + state.settings.base + 'info.json?v=' + rand),
          axios.get(host + state.settings.base + 'players.json?v=' + rand),
          axios.get(host + state.settings.base + 'mesh.json?v=' + rand),
          axios.get(host + state.settings.base + 'seeds.json?v=' + rand),
          axios.get(host + state.settings.base + 'scores.json?v=' + rand),
          axios.get(host + state.settings.base + 'medias.json?v=' + rand)
        ]).then((values) => {
          state.info = values[0].data
          // console.log(values, values[0].data.name)
          document.title = state.info.name
          initZoomer(state, state.info.zoom)
          state.settings.type = state.info.type
          state.settings.stages = state.info.stages
          state.settings.rtype = state.info.rtype
          state.settings.status = state.info.status
          state.settings.shortType = state.info.shortType
          if (state.info.nameWidth) state.settings.nameWidth = state.info.nameWidth
          if (state.info.matchWidth) state.settings.matchWidth = state.info.matchWidth
          state.settings.stretchNames = state.info.stretchNames
          state.settings.showLogo = state.info.showLogo
          state.settings.showPlayers = state.info.showPlayers
          state.settings.showPlaces = state.info.showPlaces
          state.edit.logos = state.info.logos || []
          state.players = values[1].data.players
          state.mesh = values[2].data.mesh
          state.settings.rule = values[2].data.rule
          state.settings.fin = values[2].data.fin
          if (values[2].data.placesPosition) values[2].data.placesPosition.map((item, index) => (state.settings.placesPosition[index] = item))
          if (values[2].data.stagesPosition) values[2].data.stagesPosition.map((item, index) => (state.settings.stagesPosition[index] = item))
          state.seeds = values[3].data.seeds
          state.scores = values[4].data.scores
          state.medias = values[5].data.medias
          state.titles = values[5].data.titles
          state.texts = values[5].data.texts
          try {
            preparePlayers(state)
            if (state.settings.type === 'pairs') {
              preparePairs(state, values[1].data.pairs)
            }
            createTournament(state)
          } catch (e) {
            console.log(e)
          }
        }).catch(e => {
          console.error(e)
          router.push({ path: '/now' })
        })
      }
      // preparePlayers(state, [0, 2, 1, 4, 7, 6, 5, 3, 10, 11, 9, 8, -1, 14, 13, 12])
      // createTournament(state)
    },
    over (state, { order, $event }) {
      overHalf(state, { order, $event })
    },
    out (state, { order, $event }) {
      outHalf(state, { order, $event })
    },
    overGroupCell (state, { order, $event }) {
      overGroupCell(state, { order, $event })
    },
    outGroupCell (state, { order, $event }) {
      outGroupCell(state, { order, $event })
    },
    click (state, { order, $event }) {
      const s = order[0]
      const i = order[1]
      const j = order[2]
      const p = order[3]
      if ($event.ctrlKey || $event.altKey) {
        console.log(state.edit.itemToSwitch)
        if (!state.edit.itemToSwitch) {
          state.edit.itemToSwitch = [ ...order ]
        } else {
          outHalf(state, {})
          switchOrder(state, s, state.edit.itemToSwitch, order, !$event.altKey)
          state.edit.itemToSwitch = null
          overHalf(state, { order })
        }
      } else if ($event.shiftKey) {
        state.edit.itemsToMove.push(state.matches[s][i][j])
      } else {
        // console.log(state.matches[s][i][j].names[p])
        // if (i === 0 && state.matches[s][i][j].names[p].indexOf('Записывайтесь') !== -1) {
        //   document.location.href = 'tg://t.me/joinchat/FMaTykiB1RIoc7PMD5RTkQ'
        // }
        state.edit.itemsToMove = [state.matches[s][i][j]]
      }
    }
  },
  actions: {
    createPlayer ({ state, commit }, player) {
      if (state.settings.status === 'edit') {
        Vue.set(state.edit.playersAll, state.edit.playersAll.length, { ...player })
      }
    },
    deletePlayer ({ state, commit }, seed) {
      if (state.settings.status === 'edit') {
        const curve = state.curves2[0][seed]
        if (curve) {
          state.curves2[0].splice(seed, 1)
        }
        state.players.splice(seed, 1)
        setTimeout(() => redrawPlayersCurves(state, 0))
      }
    },
    addPlayer ({ state, commit }, player) {
      if (state.settings.status === 'edit') {
        Vue.set(state.players, state.players.length, { ...player })
        preparePlayers(state)
        state.players.sort((a, b) => {
          return b.currentRating - a.currentRating
        })
        if (state.settings.showPlayers) {
          setTimeout(() => redrawPlayersCurves(state, 0))
        }
      }
    },
    addVideoPoint ({ state, commit }, { k, position }) {
      console.log('add point', k, position)
      const current = state.video.score[state.video.score.length - 1].split(' ')
      const lastPosition = state.video.scoreTime[state.video.scoreTime.length - 1]
      current[k]++
      if (k < 2) {
        current[2] = 0
        current[3] = 0
      }
      position = Math.floor(position * 10) / 10
      if (lastPosition >= position) {
        state.video.score[state.video.score.length - 1] = current.join(' ')
        state.video.scoreTime[state.video.scoreTime.length - 1] = position
      } else {
        state.video.score[state.video.score.length] = current.join(' ')
        state.video.scoreTime[state.video.scoreTime.length] = position
      }
      console.log('  "scoreTime": [' + state.video.scoreTime.join(',') + '],\n  "score": ["' + state.video.score.join('","') + '"]\n')
    },
    shrinkVideoPoint ({ state, commit }, { position }) {
      console.log('shrink to', position)
      let lastPosition = state.video.scoreTime[state.video.scoreTime.length - 1]
      while (lastPosition >= position && state.video.scoreTime.length > 1) {
        state.video.scoreTime.pop()
        state.video.score.pop()
        lastPosition = state.video.scoreTime[state.video.scoreTime.length - 1]
        console.log(state.video.scoreTime.length, lastPosition, position)
      }
      console.log('  "scoreTime": [' + state.video.scoreTime.join(',') + '],\n  "score": ["' + state.video.score.join('","') + '"]\n')
    },
    showVideoPoint ({ state, commit }, { position }) {
      console.log('scoreTime: ', state.video.scoreTime)
      console.log('score: ', state.video.score)
    },
    loadVideoBoard ({ state, commit }, id) {
      const host = !state.debug.localhost ? 'https://azoft.tk/' : ''
      return axios.get(host + state.settings.base + '/board/' + id + '.json').then(({ data }) => {
        state.video.audioTime = data.audioTime ? data.audioTime.map((t) => typeof t === 'number' ? t : t.split(':').reduce((acc, time) => (60 * acc) + +time)) : [0]
        state.video.audio = Array.isArray(data.audio) ? data.audio : [data.audio]
        state.video.chevrons = [data.chevron1, data.chevron2]
        state.video.ratings = [data.rating1, data.rating2]
        state.video.logos = [data.logo1 ? state.settings.base + data.logo1 : '', data.logo2 ? state.settings.base + data.logo2 : '']
        state.video.names = [data.name1, data.name2]
        state.video.subtitle = data.subtitle
        state.video.scoreTime = data.scoreTime
        state.video.score = data.score
        // console.log('set store audio', data.audio)
        // Vue.set(state.video, 'audio', data.audio)
      })
    },
    setGroupHeight ({ state, commit }, { s, height }) {
      state.settings.groupsRowHeight[0] = height
      // set Players position
      state.settings.playersPosition[1] = height / 2 - state.settings.playersHeight / 2
      // create Players curves
      if (s === 0 && state.settings.showPlayers) {
        redrawPlayersCurves(state, s)
      }
    },
    setGroupReady ({ state, commit }) {
      setGroupReady(state, state.edit.current)
    },
    setGroupProgress ({ state, commit }) {
      setGroupProgress(state, state.edit.current)
    },
    deleteGroupResult ({ state, commit }) {
      deleteGroupScore(state, state.edit.current)
    },
    setGroupResult ({ state, commit }, key) {
      if (!state.edit.next) {
        setGroupScore(state, state.edit.current, key)
        state.edit.next = true
        if (key === 'Tex') {
          setGroupWinner(state, state.edit.current, true)
          setGroupScore(state, state.edit.current, 'Tex', true)
        } if (key >= state.settings.maxScore) {
          setGroupWinner(state, state.edit.current)
          setGroupScore(state, state.edit.current, 0, true)
        } else {
          setGroupWinner(state, state.edit.current, true)
          setGroupScore(state, state.edit.current, state.settings.maxScore, true)
        }
      } else {
        setGroupScore(state, state.edit.current, key, true)
        state.edit.next = false
        if (key >= state.settings.maxScore /* && ['win1', 'win2'].indexOf(state.matches[s][index][count].status) === -1 */) {
          setGroupWinner(state, state.edit.current)
        }
      }
    },
    setMatchReady ({ state, commit }) {
      const s = state.edit.current[0]
      const i = state.edit.current[1]
      const j = state.edit.current[2]
      const p = state.edit.current[3]
      const match = state.matches[s][i][j]
      if (match.seeds[1] === -1) {
        return
      }
      let status = state.scores[s][i][j][2]
      if (status === 'ready1' && !p) {
        status = ''
      } else if (status === 'ready2' && p) {
        status = ''
      } else if (status === 'ready1' && p) {
        status = 'ready'
      } else if (status === 'ready2' && !p) {
        status = 'ready'
      } else if (status === 'ready' && !p) {
        status = 'ready2'
      } else if (status === 'ready' && p) {
        status = 'ready1'
      } else if (status === '' && p) {
        status = 'ready2'
      } else if (status === '' && !p) {
        status = 'ready1'
      }
      if (state.scores[s][i][j]) {
        state.scores[s][i][j][2] = status
      }
    },
    setMatchResult ({ state, commit }, key) {
      const order = state.edit.current
      const s = order[0]
      const i = order[1]
      const j = order[2]
      const p = order[3]
      const match = state.matches[s][i][j]
      const status = state.scores[s][i][j][2]
      if (match.seeds[1] === -1 || status === 'ready1' || status === 'ready2') {
        return
      }
      // console.log('Какой ты хитрый, ' + state.players[match.seeds[p]].short2 + '!')
      // return
      const [p1, p2] = match.seeds
      outHalf(state, {})
      if (!state.edit.next) {
        setMatchScore(state, order, key)
        state.edit.next = true
        if (key === 'Tex') {
          setMatchWinner(state, order, true)
          setMatchScore(state, order, 'Tex', true)
          addMatchDeltas(state, p1, p2, order)
        } if (key >= state.settings.maxScore) {
          setMatchWinner(state, order)
          setMatchScore(state, order, 0, true)
          addMatchDeltas(state, p1, p2, order)
        } else {
          setMatchWinner(state, order, true)
          setMatchScore(state, order, state.settings.maxScore, true)
          addMatchDeltas(state, p1, p2, order)
        }
      } else {
        setMatchScore(state, order, key, true)
        addMatchDeltas(state, p1, p2, order)
        state.edit.next = false
        if (key >= state.settings.maxScore /* && ['win1', 'win2'].indexOf(state.matches[s][i][j].status) === -1 */) {
          setMatchWinner(state, order)
        }
      }
      setTimeout(() => overHalf(state, { order: [ s, i, j, p ] }))
    },
    moveObjects ({ state, commit }, { dx, dy }) {
      state.edit.itemsToMove.forEach((match) => {
        if (match.seeds) {
          const [s, i, j] = match.order
          const [p1, p2] = match.seeds
          const status = state.scores[s][i][j][2]
          match.position = [state.mesh[s][i][j * 2] = match.position[0] + dx, state.mesh[s][i][j * 2 + 1] = match.position[1] + dy]
          // let isFinished = status === 'win1' || status === 'win2'
          let isReady = status === 'win1' || status === 'win2' || status === 'ready'
          if (match.curves) {
            updateMatchCurve(match.curves[0], state, p1, match.order[0], match.order[1], match.order[2], 0,
              { color: isReady || status === 'ready1' ? state.colors[p1] : null, shiftX: match.curvesShiftX ? match.curvesShiftX[0] : 0 })
            updateMatchCurve(match.curves[1], state, p2, match.order[0], match.order[1], match.order[2], 1,
              { color: isReady || status === 'ready2' ? state.colors[p2] : null, shiftX: match.curvesShiftX ? match.curvesShiftX[1] : 0 })
          }
          // updateNextMatchCurves(state, s, i, j, p1, p2, isFinished)
        } else { // media
          match[1] += dx
          match[2] += dy
          console.log(match.join(', '))
          Vue.set(state.medias, 0, state.medias[0])
        }
      })
      // console.log('------', state.mesh)
      let meshOut = ''
      state.mesh.forEach((meshStage) => {
        meshOut += '['
        meshStage.forEach((meshArr) => {
          meshOut += '[' + meshArr.join(', ') + '],\n'
        })
        meshOut = meshOut.slice(0, -2) + '],\n'
      })
      console.log(meshOut.slice(0, -2) + '\n')
    },
    saveResults ({ state, commit }) {
      git.saveState(state.settings.base, ['seeds.json', 'scores.json'], [
        JSON.stringify({ seeds: state.seeds }).replace('[[', '[\n[').replace(/\],\[/gm, '],\n['),
        JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n[')
      ])
    },
    saveAllResults ({ state, commit }) {
      if (state.settings.type === 'pairs') {
        git.saveState(state.settings.base, ['info.json', 'players.json', 'medias.json', 'mesh.json', 'seeds.json', 'scores.json'], [
          JSON.stringify({ ...state.info }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({ players: state.players0.map(({ short, short2, currentRating, logoUrl, ...items }) => items),
            pairs: state.players.map(({ location, location2, currentRating, ...items }) => items)
          }).replace('{', '{\n').replace('[', '[\n').replace(/",/gm, '",\n').replace(/"pairs":/gm, '\n"pairs":\n').replace(/}/gm, '\n}').replace(/{/gm, '{\n'),
          JSON.stringify({ medias: state.medias }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({ mesh: state.mesh }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({ seeds: state.seeds }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n[')
        ])
      } else {
        git.saveState(state.settings.base, ['info.json', 'players.json', 'medias.json', 'mesh.json', 'seeds.json', 'scores.json'], [
          JSON.stringify({ ...state.info }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({
            players: state.players.map(({ short, currentRating, ...items }) => items)
          }).replace('{', '{\n').replace('[', '[\n').replace(/",/gm, '",\n').replace(/{/gm, '{\n'),
          JSON.stringify({ medias: state.medias }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({ mesh: state.mesh }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({ seeds: state.seeds }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['),
          JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n[')
        ])
      }
    },
    saveFiles ({ state, commit }) {
      if (state.settings.type === 'pairs') {
        // git.saveFile('info.json', JSON.stringify({ ...state.info }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
        if (state.save.players) {
          git.saveFile('players.json', JSON.stringify({
            players: state.players0.map(({ short, short2, currentRating, logoUrl, ...items }) => items),
            pairs: state.save.pairs ? state.players.map(({ location, location2, currentRating, ...items }) => items) : null
          }).replace('{', '{\n').replace('[', '[\n').replace(/",/gm, '",\n').replace(/"pairs"/gm, '\n"pairs"').replace(/}/gm, '\n}').replace(/{/gm, '{\n'))
        }
        if (state.save.seeds) {
          git.saveFile('seeds.json', JSON.stringify({ seeds: state.seeds }).replace('[[', '[\n[').replace(/\],\[/gm, '],\n['))
        }
        if (state.save.scores) {
          git.saveFile('scores.json', JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
        }
      } else {
        if (state.save.players) {
          git.saveFile('players.json', JSON.stringify({
            players: state.players.map(({ short, short2, currentRating, curve, logoUrl, ...items }) => items)
          }).replace('{', '{\n').replace('[', '[\n').replace(/",/gm, '",\n').replace(/"pairs"/gm, '\n"pairs"').replace(/}/gm, '\n}').replace(/{/gm, '{\n'))
        }
        if (state.save.seeds) {
          git.saveFile('seeds.json', JSON.stringify({ seeds: state.seeds }).replace('[[', '[\n[').replace(/\],\[/gm, '],\n['))
        }
        if (state.save.scores) {
          git.saveFile('scores.json', JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
        }
      }
    },
    switchRole ({ state, commit }) {
      state.settings.role = state.settings.role === 'admin' ? '' : 'admin'
    },
    restoreFromStorage ({ state, commit }) {
      state.seeds = JSON.parse(localStorage['seeds'])
      state.scores = JSON.parse(localStorage['scores'])
      createTournament(state)
    },
    savePlayers ({ state, commit }) {
      // git.saveState(state.settings.base, ['players.json'], { players: state.players })
    },
    centerMatch ({ state, commit }) {
      if (state.edit.readyMatches.length) {
        const zoomer = state.zoomer
        state.edit.centeredMatch = (state.edit.centeredMatch + 1) % state.edit.readyMatches.length
        const match = state.edit.readyMatches[state.edit.centeredMatch]
        var initialSizes = zoomer.getSizes()
        var initialLoc = zoomer.getPan()
        var initialBounds = document.querySelector('#match-' + match.order[0] + '-' + match.order[1] + '-' + match.order[2]).getBoundingClientRect()
        console.log(initialBounds)
        var initialZoom = zoomer.getZoom()
        var initialCX = initialBounds.x + (initialBounds.width / 2)
        var initialCY = initialBounds.y + (initialBounds.height / 2)

        var dX = (initialSizes.width / 2) - initialCX
        var dY = (initialSizes.height / 2) - initialCY

        // zoomer.panBy({ x: -1000, y: -500 })
        // customPanByZoomAtEnd({ x: dX, y: dY }, 2, 700)
      }
    }
  }
})

function preparePairs (state, pairs) {
  state.players0 = [...state.players]
  if (pairs) {
    state.players = pairs
    return
  }
  state.players0.sort((a, b) => {
    return b.currentRating - a.currentRating
  })
  // console.log(state.players0)
  state.players = []
  const l = Math.floor(state.players0.length / 2) * 2
  for (let i = 0; i < l / 2; i++) {
    let player1 = state.players0[i]
    // let player1 = state.players0[i * 2]
    // let player2 = state.players0[i * 2 + 1]
    let player2 = state.players0[l - i - 1]
    let r1 = player1.currentRating
    let r2 = player2.currentRating
    let w = state.settings.rtype === 'average' ? 0.5 : (r1 - r2) / (r1 + r2) / 2.5 + 0.5
    // console.log(i, l, player1, player2, w)
    let r = state.settings.rtype === 'sum' ? r1 + r2 : Math.round(r1 * (1 - w) + r2 * w)
    state.players[i] = {
      name: player1.name,
      name2: player2.name,
      logo: player1.logo,
      logo2: player2.logo,
      location: player1.location,
      location2: player2.location,
      short: player1.short + ' и ' + player2.short,
      currentRating: Math.round(r),
      rating: Math.round(r)
    }
  }
  state.players.sort((a, b) => {
    return b.currentRating - a.currentRating
  })
  // console.log(state.players, state.players0)
}

function preparePlayers (state, seedArr) {
  const nameSet = new Set()
  state.players.map((player) => {
    player.currentRating = +player.rating
    const names = player.name.split(' ')
    player.short = names[0]
    if (names.length > 1) {
      player.short2 = names[0] + ' ' + names[1]
      if (state.settings.shortType === 'fullName') {
        player.short = names[1] + ' ' + names[0].substr(0, 1) + '.'
      } else if (state.settings.shortType === 'onlyName') {
        player.short = names[1]
      } else if (state.settings.shortType === 'full2') {
        player.short += ' ' + names[1]
      } else {
        player.short += ' ' + names[1].substr(0, 1) + '.'
      }
      if (player.logo) {
        player.logoUrl = state.settings.base + player.logo
      }
    }
    if (nameSet[player.short] && names.length > 2) {
      player.short += ' ' + names[2].substr(0, 1) + '.'
      if (nameSet[player.short]) {
        player.short += ' ' + '2'
      }
    }
    nameSet[player.short] = names
  })
  if (seedArr) {
    if (seedArr === true) {
      state.players.sort((a, b) => {
        return b.rating - a.rating
      })
    } else {
      seedArr.forEach((p0, index) => {
        if (p0 === -1) {
          removeSeed(state, index)
        }
      })
      state.seeds = state.seeds.map((order) => (order.map((p) => (p < 0 ? p : seedArr[p]))))

      console.log('------', state.seeds)
      let seedsOut = ''
      state.seeds.forEach((seedsArr) => {
        seedsOut += '[' + seedsArr.join(', ') + '],\n'
      })
      console.log(seedsOut.slice(0, -2) + '\n')
    }
    // state.players.forEach((player) => { console.log(player.short, player.rating) })
  }
}

function createTournament (state) {
  state.curves2 = [new Array(state.players.length), new Array(state.players.length), new Array(state.players.length)]
  state.curves = []
  state.deltas = []
  state.matches = []
  state.groups = []
  state.readyMatches = []
  if (state.info.stages) {
    state.info.stages.forEach((stageType, stage) => {
      // console.log(stageType, stage)
      if (stageType === 'groups' || (Array.isArray(stageType) && stageType[0] === 'groups')) {
        Vue.set(state.groups, stage, [])
        Vue.set(state.places, stage, [])
        Vue.set(state.curves, stage, [])
        Vue.set(state.deltas, stage, [])
        createGroups(state, stage, state.groups[stage], state.mesh[stage], state.seeds[stage], state.scores[stage], state.places[stage], state.curves[stage], state.deltas[stage], state.players)
      }
      if (stageType === 'finals' || (Array.isArray(stageType) && stageType[0] === 'finals')) {
        if (stage === state.info.stages.length - 1 && Array.isArray(stageType)) {
          state.settings.finalsNum = stageType.length
          state.settings.finalsSizes = stageType.slice(1)
        }
        Vue.set(state.matches, stage, [])
        Vue.set(state.places, stage, [])
        Vue.set(state.curves, stage, [])
        Vue.set(state.deltas, stage, [])
        createFinals(state, stage, state.matches[stage], state.mesh[stage], state.seeds[stage], state.scores[stage], state.places[stage], state.curves[stage], state.deltas[stage], state.players)
      }
    })
  } else {
    createFinals(state, 0, state.mesh, state.seeds, state.scores)
  }
  // console.log(state.matches)
  // console.log(state.places)
}

function createGroups (state, s, groups, mesh, seeds, scores, places, curves, deltas, players) {
  // console.log(s, mesh, mesh.length, seeds, scores)
  for (let g = 0; g < mesh.length; g++) {
    if (!seeds[g]) {
      continue
    }
    const groupSeeds = seeds[g]
    const groupSeedsLen = groupSeeds.length
    let groupScores = scores[g]
    if (!groupScores) {
      Vue.set(scores, g, [])
      groupScores = scores[g]
    }
    groupScores.length = groupSeedsLen
    for (let j = 0; j < groupSeedsLen; j++) {
      if (!groupScores[j]) {
        Vue.set(groupScores, j, [])
      }
      for (let k = 0; k < groupSeedsLen; k++) {
        if (k === j) {
          if (groupScores[j][k]) {
            Vue.set(groupScores[j], k, null)
          }
        } else if (!groupScores[j][k]) {
          Vue.set(groupScores[j], k, [0, 0, '', 0, 0])
        }
      }
    }
    groups.push({
      index: g,
      stage: s,
      order: [s, g],
      seeds: seeds[g],
      position: [mesh[g][0], mesh[g][1]]
    })
    // add places for groups
    const len = seeds[g].length
    places.push(Array(len))
    calcGroupPlaces(state, seeds[g], scores[g], places[g], curves, deltas, s, g)
  }
}

function calcGroupPlaces (state, seeds, scores, places, curves, deltas, s, g) {
  let finished = 0
  const current = []
  const len = scores.length
  for (let i = 0; i < len; i++) {
    const seed = seeds[i]
    Vue.set(deltas, seed, [])
    current[i] = { min: 0, max: 0, index: i, seed }
    for (let j = 0; j < len; j++) {
      const result = scores[i][j]
      // console.log(result)
      if (!result) {
        continue
      }
      const seed2 = seeds[j]
      const delta2 = getRatingDelta(state.players[seed].rating, state.players[seed2].rating, [result[0], result[1]])
      if (result[2] === 'win1') {
        const delta = Math.round(delta2[0])
        const deltaS = delta > 0 ? '+' + delta : String(delta)
        deltas[seed].push({ x: 0, value: delta, text: deltaS, width: deltaS.length * 5 + 8, time: result[4], seed2: seed2, order: [s, i, j] })
        current[i].min += 2
        current[i].max += 2
        finished++
      } else if (result[2] === 'win2') {
        const delta = Math.round(delta2[1])
        const deltaS = delta > 0 ? '+' + delta : String(delta)
        deltas[seed].push({ x: 0, value: delta, text: deltaS, width: deltaS.length * 5 + 8, time: result[4], seed2: seed2, order: [s, i, j] })
        current[i].min += (result[0] === 'Tex') ? 0 : 1
        current[i].max += (result[0] === 'Tex') ? 0 : 1
        finished++
      } else {
        current[i].max += 2
      }
    }
    deltas[seed].sort((a, b) => {
      return a.time - b.time
    })
    let sum = 0
    let rating = getDeltaRating(state, seed, [], s, -1, -1)
    for (let delta of deltas[seed]) {
      delta.x = sum
      rating += delta.value
      delta.rating = rating
      sum += delta.width + 5
    }
  }
  // console.log(current)
  // too few games
  if (finished < len) {
    current.forEach((item, index) => {
      Vue.set(places, item.index, [1, len])
      if (s === 0 && state.seeds[s + 1].length > 1) {
        setTimeout(() => {
          // console.log('----------', places, s, g)
        })
      }
    })
    // players[i].curve = createPlayersCurve(state, i, { color: state.colors[i], shiftX: 0 })
    // curves.push(state.players[i].curve)

    return
  }
  // all games
  if (finished === len * len - len) {
    current.sort((a, b) => b.max - a.max)
    // console.log('full', current)
    for (let i = 0; i < current.length - 1; i++) {
      i += resolveGroupPlaces(scores, current, i, i + 1)
    }
    current.forEach((item, index) => {
      Vue.set(places, item.index, item.split ? [item.split] : [index + 1])
      setTimeout(() => updateNextStage(state, s, g, index + 1, item.seed))
      /*  item.maxPlace = index + 1
        if (item.maxPlace <= 3) {
          console.log(333, s, g, index, state.seeds[s + 1][g])
          const place = g === 0 ? (item.maxPlace - 1) * 2 : (item.maxPlace - 1) * 2 + 1
          Vue.set(state.seeds[s + 1][0], place, state.seeds[s][g][item.index])
        } else {
          const place = g === 0 ? (item.maxPlace - 4) * 2 : (item.maxPlace - 4) * 2 + 1
          Vue.set(state.seeds[s + 1][1], place, state.seeds[s][g][item.index])
        }
      } */
    })
    return
  }
  // calculate places
  for (let i = 0; i < current.length; i++) {
    let minPlace = current.length
    let maxPlace = 1
    let minCurrent = current[i].min
    let maxCurrent = current[i].max
    for (let j = 0; j < current.length; j++) {
      if (i === j) {
        continue
      }
      if (maxCurrent < current[j].min) {
        maxPlace++
      }
      if (minCurrent > current[j].max) {
        minPlace--
      }
    }
    current[i].minPlace = minPlace
    current[i].maxPlace = maxPlace
  }
  // set places
  current.forEach((item, index) => {
    Vue.set(places, item.index, item.minPlace === item.maxPlace ? [item.minPlace] : [item.maxPlace, item.minPlace])
    if (item.minPlace === item.maxPlace) {
      setTimeout(() => updateNextStage(state, s, g, item.maxPlace, item.seed))
    }
  })
  current.sort((a, b) => a.maxPlace - b.maxPlace)
  // sort clusters if possible
  for (let i = 0; i < current.length - 1; i++) {
    let n = resolveGroupPlaces(scores, current, i, i + 1)
    if (n > 0) {
      for (let j = i; j < i + n + 1; j++) {
        Vue.set(places, current[j].index, current[j].split ? [current[j].split] : [j + 1])
      }
      i += n
    }
  }
  // console.log(state.places)
  // Vue.set(places, 0, places[0])
  // console.log('------', real, places, current)
}

function resolveResult (res) {
  const r0 = res[0] === 'Tex' ? 0 : res[0]
  const r1 = res[1] === 'Tex' ? 0 : res[1]
  return r0 - r1
}
function resolveGroupPlaces (scores, arr, start, maxPlace) {
  if (start + 1 >= arr.length || arr[start].min !== arr[start].max || arr[start + 1].min !== arr[start + 1].max || arr[start].max !== arr[start + 1].max) {
    return 0
  }
  let len = 2
  while (start + len < arr.length && arr[start].max === arr[start + len].max && arr[start + len].min === arr[start + len].max) {
    len++
  }
  if ((start > 0 && arr[start - 1].max === arr[start].max) || (start + len < arr.length && arr[start + len].max === arr[start].max)) {
    return 0
  }
  console.log('resolving ' + (start + 1) + '-' + (start + len) + ', score: ' + arr[start].max)
  if (len === 2) {
    let d = resolveResult(scores[arr[start].index][arr[start + 1].index])
    arr[start].max += d / 1000
    arr.splice(start, 0, ...arr.splice(start, len).sort((a, b) => b.max - a.max))
    console.log('personal ' + (arr[start].index + 1) + ' ' + (d > 0 ? '+' + d : d) + '(' + (arr[start + 1].index + 1) + ')')
  } else {
    for (let i = start; i < start + len; i++) {
      let a = 0
      let s = (arr[i].index + 1) + ':'
      for (let j = start; j < start + len; j++) {
        if (i === j) {
          continue
        }
        let d = resolveResult(scores[arr[i].index][arr[j].index])
        a += d
        s += ' ' + (d > 0 ? '+' + d : d) + '(' + (arr[j].index + 1) + ')'
      }
      arr[i].max += a / 100
      console.log(s + ' = ' + (a > 0 ? '+' + a : a))
    }
    let sorted = arr.splice(start, len).sort((a, b) => b.max - a.max)
    arr.splice(start, 0, ...sorted)
    let value = arr[start].max
    // console.log(sorted, len)
    for (let i = start + 1; i < start + len; i++) {
      if (arr[i].max === value) {
        if (i + 1 === start + len || arr[i + 1].max !== value) {
          let d = resolveResult(scores[arr[i - 1].index][arr[i].index])
          arr[i - 1].max += d / 1000
          arr.splice(i - 1, 0, ...arr.splice(i - 1, 2).sort((a, b) => b.max - a.max))
          console.log('personal ' + (arr[i - 1].index + 1) + ' ' + (d > 0 ? '+' + d : d) + '(' + (arr[i].index + 1) + ')')
        } else {
          let splitString = i
          const split = []
          split.push(arr[i - 1])
          while (i < start + len && arr[i].max === value) {
            split.push(arr[i])
            i++
          }
          splitString += '..' + i
          split.forEach((item, index) => (item.split = splitString))
        }
      } else {
        value = arr[i].max
      }
    }
  }
  return len - 1
}
function createFinals (state, s, matches, mesh, seeds, scores, places, curves, deltas, players) {
  for (let i = 0; i < seeds.length; i++) {
    let round = []
    let seedsArr = seeds[i]
    // console.log(s, scores)
    if (!scores[i]) {
      scores[i] = []
    }
    const len = seedsArr.length / 2
    for (let j = 0; j < len; j++) {
      const order = [s, i, j]
      let p1 = seedsArr[j * 2]
      let p2 = seedsArr[j * 2 + 1]
      if (p1 < 0 || p2 < 0) {
        if (i === 0 && p1 >= 0) {
          round.push({
            order,
            seeds: [p1, -1],
            position: [mesh[i][j * 2], mesh[i][j * 2 + 1]]
          })
        } else if (i === 0 && p2 >= 0) {
          round.push({
            order,
            seeds: [p2, -1],
            position: [mesh[i][j * 2], mesh[i][j * 2 + 1]]
          })
        } else {
          round.push(null)
        }
        continue
      }
      if (!scores[i][j] || scores[i][j].length < 3) {
        scores[i][j] = [0, 0, state.debug.showEmpty ? 'ready' : '', 0, 0]
      }
      let status = scores[i][j][2]
      let isReady = status === 'win1' || status === 'win2' || status === 'ready'
      let isFinished = status === 'win1' || status === 'win2'
      if (isFinished) {
        // push new delta
        addMatchDeltas(state, p1, p2, order)
      } else if (state.debug.showEmpty) {
        Vue.set(scores[i][j], 2, 'ready')
      }
      let curvesShiftX = null
      let matchCurves = null
      if (i > 0) {
        curvesShiftX = [
          getShiftX(i, j, len),
          getShiftX(i, j, len) - 0.2
        ]
        let colors = [isReady || status === 'ready1' ? state.colors[p1] : null, isReady || status === 'ready2' ? state.colors[p2] : null]
        // if (i === 2 && j === 0) {
        //   console.log('stat', status, isReady, scores[i], colors)
        // }
        // console.log(p1, p2, s, i, j)
        matchCurves = [
          createMatchCurve(state, p1, s, i, j, 0, { color: colors[0], shiftX: curvesShiftX[0] }),
          createMatchCurve(state, p2, s, i, j, 1, { color: colors[1], shiftX: curvesShiftX[1] })
        ]
        if (matchCurves[0]) {
          curves.push(matchCurves[0])
        }
        if (matchCurves[1]) {
          curves.push(matchCurves[1])
        }
      }
      const match = {
        order,
        seeds: [p1, p2],
        curves: matchCurves,
        curvesShiftX,
        position: [mesh[i][j * 2], mesh[i][j * 2 + 1]]
      }
      round.push(match)
      if (isFinished) {
      } else if (status === 'ready') {
        state.edit.readyMatches.push(match)
      }
    }
    matches.push(round)
  }
  // console.log(matches)
  places.length = seeds.length
  createTopCurves(state, s)
  // console.log(44444, state.places)
}

function overHalf (state, { order, $event }) {
  const s = order[0]
  const i = order[1]
  const j = order[2]
  const p = order[3]
  console.log('i=' + i, 'j=' + j, 'seeds:', state.matches[s][i][j].seeds.join(','), 'status:', state.scores[s][i][j][2],
    'position:', state.matches[s][i][j].position.join(','),
    'title position:', (state.matches[s][i][j].position[0] + state.settings.stagesPosition[s][0] + 5) + ', ' + (state.matches[s][i][j].position[1] + state.settings.stagesPosition[s][1] - 5),
    'colors:', state.colors[state.matches[s][i][j].seeds[0]], state.colors[state.matches[s][i][j].seeds[1]])
  // console.log('g=' + i, 'j=' + j, 'seeds:', state.matches[s][i][j].seeds[0] - 8, state.matches[s][i][j].seeds[1] - 8, 'status:', state.matches[s][i][j].status, 'position:', state.matches[s][i][j].position.join(','), 'colors:', state.colors[state.matches[s][i][j].seeds[0]], state.colors[state.matches[s][i][j].seeds[1]])
  if ($event && (i !== state.edit.current[0] || j !== state.edit.current[1] || p !== state.edit.current[2])) {
    state.edit.current = order
    state.edit.type = 'match'
    state.edit.over = [state.matches[s][i][j].seeds[p]]
  }
  document.querySelectorAll('#player' + state.matches[s][i][j].seeds[p] + ':not(.empty)').forEach((element) => element.classList.add('over'))
}

function outHalf (state, { order, $event }) {
  if ($event && state.edit.current) {
    state.edit.next = false
  }
  document.querySelectorAll('#player' + state.edit.over[0]).forEach((element) => element.classList.remove('over'))
}

function setMatchScore (state, order, score, opponent = false) {
  const s = order[0]
  const i = order[1]
  const j = order[2]
  const p = opponent ? 1 - order[3] : order[3]
  // state.scores[s][i][j][p] = score
  Vue.set(state.scores[s][i][j], p, score)
  localStorage['scores'] = JSON.stringify(state.scores)
  localStorage['seeds'] = JSON.stringify(state.seeds)
  // console.log(JSON.stringify(state.scores).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
  // console.log(JSON.stringify(state.seeds).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
}

function setMatchWinner (state, order, opponent = false) {
  const s = order[0]
  const i = order[1]
  const j = order[2]
  const p = opponent ? 1 - order[3] : order[3]
  const match = state.matches[s][i][j]
  const statusOld = state.scores[s][i][j][2]
  const statusNew = p ? 'win2' : 'win1'
  Vue.set(state.scores[s][i][j], 2, statusNew)
  const t = +new Date()
  Vue.set(state.scores[s][i][j], 4, t)
  if (!state.scores[s][i][j][3]) {
    const min5 = 5 * 60 * 1000
    Vue.set(state.scores[s][i][j], 3, t - min5)
  }
  let [p1, p2] = match.seeds
  // console.log(5555, p, statusOld, statusNew, match.seeds)
  if (i + 1 < state.seeds[s].length && ((statusOld === 'win2' && statusNew === 'win1') || (statusOld !== 'win2' && statusNew === 'win2'))) {
    for (let k = i + 1; k < state.seeds[s].length; k++) {
      let index1 = state.seeds[s][k].indexOf(p1)
      let index2 = state.seeds[s][k].indexOf(p2)
      switchSeeds(state, s, k, index1, index2, p1, p2)
    }
  }
  updateNextMatches(state, s, i, j, p1, p2)
  updateNextMatchCurves(state, s, i, j, p1, p2, true)
}

function overGroupCell (state, { order, $event }) {
  const s = order[0]
  const g = order[1]
  const i = order[2]
  const j = order[3]
  const seed1 = state.seeds[s][g][i]
  const seed2 = state.seeds[s][g][j]
  // if (seed1 < 0 || seed2 < 0) return
  if ($event && (s !== state.edit.current[0] || g !== state.edit.current[1] || i !== state.edit.current[2] || j !== state.edit.current[3])) {
    // console.log('s=' + s, 'g=' + g, 'i=' + i, 'j=' + j)
    // console.log('seeds:', state.seeds[s][g][g], state.seeds[s][g][j], 'status:', state.scores[s][g][g][j])
    state.edit.current = order
    state.edit.type = 'group'
    state.edit.over = [...order]
  }
  document.querySelectorAll('#player' + seed1 + ':not(.empty)').forEach((element) => element.classList.add('over'))
  document.querySelectorAll('#player' + seed2 + ':not(.empty)').forEach((element) => element.classList.add('over'))
  document.querySelectorAll('#group-' + s + '-' + g + '-' + i + '-' + j + ':not(.empty)').forEach((element) => element.classList.add('group-cell-over'))
  document.querySelectorAll('#group-' + s + '-' + g + '-' + j + '-' + i + ':not(.empty)').forEach((element) => element.classList.add('group-cell-over'))
  // document.querySelectorAll('#player' + state.seeds[s][g][g] + ':not(.empty)').forEach((element) => element.classList.add('over'))
  // document.querySelectorAll('#player' + state.seeds[s][g][j] + ':not(.empty)').forEach((element) => element.classList.add('over'))
}

function outGroupCell (state, { order, $event }) {
  if ($event && state.edit.current) {
    state.edit.next = false
  }
  if (state.edit.over && state.edit.over.length === 4) {
    const s = state.edit.over[0]
    const g = state.edit.over[1]
    const i = state.edit.over[2]
    const j = state.edit.over[3]
    const seed1 = state.seeds[s][g][i]
    const seed2 = state.seeds[s][g][j]
    document.querySelectorAll('#player' + seed1 + ':not(.empty)').forEach((element) => element.classList.remove('over'))
    document.querySelectorAll('#player' + seed2 + ':not(.empty)').forEach((element) => element.classList.remove('over'))
    document.querySelectorAll('#group-' + s + '-' + g + '-' + i + '-' + j + ':not(.empty)').forEach((element) => element.classList.remove('group-cell-over'))
    document.querySelectorAll('#group-' + s + '-' + g + '-' + j + '-' + i + ':not(.empty)').forEach((element) => element.classList.remove('group-cell-over'))
  }
  // document.querySelectorAll('#player' + state.matches[state.edit.current[0]][state.edit.current[1]].seeds[state.edit.current[2]]).forEach((element) => element.classList.remove('over'))
}

function setGroupReady (state, order) {
  const s = order[0]
  const g = order[1]
  const i = order[2]
  const j = order[3]
  // console.log('setGroupProgress')
}

function setGroupProgress (state, order) {
  const s = order[0]
  const g = order[1]
  const i = order[2]
  const j = order[3]
  // console.log('setGroupProgress')
  const t = +new Date()
  if (state.scores[s][g][i][j][2] === '') {
    state.scores[s][g][i][j][2] = 'progress'
    state.scores[s][g][j][i][2] = 'progress'
    state.scores[s][g][i][j][3] = t
    state.scores[s][g][j][i][3] = t
    // Vue.set(state.scores[s][g][g][j], 2, 'progress')
  } else if (state.scores[s][g][i][j][2] === 'progress') {
    state.scores[s][g][i][j][2] = ''
    state.scores[s][g][j][i][2] = ''
    state.scores[s][g][i][j][3] = 0
    state.scores[s][g][j][i][3] = 0
  }
  Vue.set(state.scores[s][g][j], i, state.scores[s][g][j][i])
  // console.log(JSON.stringify(state.scores).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
}

function setGroupScore (state, order, score, opponent = false) {
  const s = order[0]
  const g = order[1]
  const i = order[2]
  const j = order[3]
  // console.log('setGroupScore', score, opponent)
  // state.scores[s][g][g][j] = score
  Vue.set(state.scores[s][g][i][j], opponent ? 1 : 0, score)
  Vue.set(state.scores[s][g][j][i], opponent ? 0 : 1, score)
  calcGroupPlaces(state, state.seeds[s][g], state.scores[s][g], state.places[s][g], state.curves[s], state.deltas[s], s, g)
  // Vue.set(state.scores[s][g][j], g, [...state.scores[s][g][j][g]])
  // console.log(JSON.stringify(state.scores).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
  // console.log(JSON.stringify(state.seeds).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
  // console.log(JSON.stringify(state.scores).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
}

function deleteGroupScore (state, order) {
  const s = order[0]
  const g = order[1]
  const i = order[2]
  const j = order[3]
  // console.log('setGroupScore', score, opponent)
  // state.scores[s][g][g][j] = score
  Vue.set(state.scores[s][g][i], j, [0, 0, '', 0, 0])
  Vue.set(state.scores[s][g][j], i, [0, 0, '', 0, 0])
  calcGroupPlaces(state, state.seeds[s][g], state.scores[s][g], state.places[s][g], state.curves[s], state.deltas[s], s, g)
}

function setGroupWinner (state, order, opponent = false) {
  const s = order[0]
  const g = order[1]
  const i = order[2]
  const j = order[3]
  // const statusOld = game[2]
  const t = +new Date()
  Vue.set(state.scores[s][g][i][j], 2, opponent ? 'win2' : 'win1')
  Vue.set(state.scores[s][g][j][i], 2, opponent ? 'win1' : 'win2')
  Vue.set(state.scores[s][g][i][j], 4, t)
  Vue.set(state.scores[s][g][j][i], 4, t)
  if (state.scores[s][g][i][j][3] === 0) {
    const min5 = 5 * 60 * 1000
    Vue.set(state.scores[s][g][i][j], 3, t - min5)
    Vue.set(state.scores[s][g][j][i], 3, t - min5)
  }
  // Vue.set(state.scores, s, state.scores[s])
}

function switchSeeds (state, s, i, index1, index2, p1, p2, updateCurves = true) {
  // return
  if (index1 !== -1) {
    state.seeds[s][i][index1] = p2
    setMatchSeed(state, s, i, index1, p2, updateCurves)
  }
  if (index2 !== -1) {
    state.seeds[s][i][index2] = p1
    setMatchSeed(state, s, i, index2, p1, updateCurves)
  }
}

function setMatchSeed (state, s, i, j, p, updateCurves = true) {
  if (!state.matches) {
    return
  }
  // console.log(state.matches)
  // console.log(state.matches[s])
  const match = state.matches[s][i][Math.floor(j / 2)]
  if (!match) {
    return
  }
  // console.log(match, i, Math.floor(j / 2))
  const status = state.scores[s][i][Math.floor(j / 2)][2]
  let isFinished = status === 'win1' || status === 'win2'
  let isSingle = match.seeds[1] === -1
  if (j % 2 && !isSingle) {
    match.seeds[1] = p
    if (updateCurves && match.curves) {
      updateMatchCurve(match.curves[1], state, p, match.order[0], match.order[1], match.order[2], 1,
        { color: isFinished ? state.colors[p] : null, shiftX: match.curvesShiftX ? match.curvesShiftX[1] : 0 })
    }
  } else {
    match.seeds[0] = p
    if (updateCurves && match.curves) {
      updateMatchCurve(match.curves[0], state, p, match.order[0], match.order[1], match.order[2], 0,
        { color: isFinished ? state.colors[p] : null, shiftX: match.curvesShiftX ? match.curvesShiftX[0] : 0 })
    }
  }
}

function removeSeed (state, s, p) {
  let i = 0
  while (i < state.seeds[s].length) {
    let j = state.seeds[i].indexOf(p)
    if (j !== -1) {
      if (j % 2) {
        state.seeds[i][j] = -1
        if (i > 0) {
          state.seeds[i][j - 1] = -1
        }
      } else {
        let p2 = state.seeds[i][j + 1]
        for (let k = i + 1; k < state.seeds[s].length; k++) {
          let index1 = state.seeds[s][k].indexOf(p)
          let index2 = state.seeds[s][k].indexOf(p2)
          switchSeeds(state, s, k, index1, index2, p, p2)
        }
        state.seeds[i][j] = -1
        if (i > 0) {
          state.seeds[i][j + 1] = -1
        }
      }
    }
    i++
  }
}

const globalOrdering = false
function switchOrder (state, s, order1, order2, all = true) {
  let p1 = state.matches[order1[0]][order1[1]][order1[2]].seeds[order1[3]]
  let p2 = state.matches[order2[0]][order2[1]][order2[2]].seeds[order2[3]]
  // const arr = idealDE16
  if (globalOrdering) {
    for (let i = order1[0]; i < idealDE16.length; i++) {
      let index1 = idealDE16[i].indexOf(p1)
      let index2 = idealDE16[i].indexOf(p2)
      if (index1 !== -1 && index2 !== -1) {
        idealDE16[i][index1] = p2
        idealDE16[i][index2] = p1
      } else if (index1 !== -1) {
        idealDE16[i][index1] = p2
      } else if (index2 !== -1) {
        idealDE16[i][index2] = p1
      }
    }
    createTournament(state)
  } else {
    for (let k = all ? 0 : order1.index + 1; k < state.seeds[s].length; k++) {
      // console.log(s, k, p1, p2)
      let index1 = state.seeds[s][k].indexOf(p1)
      let index2 = state.seeds[s][k].indexOf(p2)
      switchSeeds(state, s, k, index1, index2, p1, p2)
    }
    localStorage['seeds'] = JSON.stringify(state.seeds)
  }
}

function getShiftX (i, j, len) {
  if (i === 1 && j >= len / 2) {
    return 1.7 * (3 / 4 - j / len)
  } else if (i === 2 && j > len * 3 / 4) {
    return 1.1 * (1.2 - j / len)
  } else if (i === 2 && j > len / 2) {
    return 1.8 * (3 / 4 - j / len)
  } else {
    return null
  }
}

function updateNextStage (state, s, g, i, seed) {
  const f0 = getNextStagePosition(state, s, g, i - 1)
  const p = state.seeds[s + 1][0][f0]
  // if (!match0) {
  //   console.log('wrong next match', state.matches[s + 1][0])
  //   return
  // }
  // console.log(1111, f0, p, state.seeds[s + 1][0], state.seeds[s + 1][0])
  // console.log('update stage', seed, '->', p, state.players[seed].short)
  if (p === -1) {
    console.log('wrong rule', f0, state.seeds[s + 1][0][f0], state.settings.rule[s][f0])
    return
  }
  if (p !== seed) {
    // if (match0.status !== '' && match0.status.indexOf('ready') === -1) {
    //   console.log('unable to update', match0.status, seed, p)
    //   return
    // }
    console.log('swap seeds')
    for (let k = 0; k < state.seeds[s + 1].length; k++) {
      let index1 = state.seeds[s + 1][k].indexOf(p)
      let index2 = state.seeds[s + 1][k].indexOf(seed)
      switchSeeds(state, s + 1, k, index1, index2, p, seed, false)
      // console.log(state.seeds[s + 1][k].join(','))
    }
  }
  // console.log(1111, s, state.seeds[1][0][f0], seed)
  updateNextReady(state, s, seed)
  // position in stage 0 groups
  let { i0, j0 } = getStage0Position(state, seed)
  // position in finals
  const j1 = state.seeds[s + 1][0].indexOf(seed)
  if (state.curves2[1][seed]) {
    // console.log('up curve', seed, g, i)
    updateStageCurve(state, s, seed, i0, j0, j1, state.curves2[1][seed], { color: state.colors[seed], shiftX: (g - 2) * 0.12 + (i - 1) * 0.05 })
    // const j2 = state.seeds[s + 1][0].indexOf(p)
    // ;({ i0, j0 } = getStage0Position(state, p))
    // if (state.players[p].curve2.dash === 2) {
    //   console.log('grey', p, state.players[p].short, i0, j0, j2)
    //   updateStageCurve(state, s, p, i0, j0, j2, state.players[p].curve2, { color: null, shiftX: (g - 2) * 0.12 + (i - 1) * 0.05 })
    // }
    // console.log(state.seeds[s + 1][0])
  }
}

function updateNextReady (state, s, seed, updateIfSingle = true) {
  // position in finals
  const j1 = state.seeds[s + 1][updateIfSingle ? 0 : 1].indexOf(seed)
  let status = state.scores[s + 1][updateIfSingle ? 0 : 1][Math.floor(j1 / 2)][2]
  const match0 = state.matches[s + 1][updateIfSingle ? 0 : 1][Math.floor(j1 / 2)]
  // console.log('match', match0.status)
  if (j1 % 2) {
    if (status === 'ready2' || status === 'ready') {
    } else if (status === 'ready1') {
      status = 'ready'
    } else if (status === '' || status === 'progress') {
      status = 'ready2'
      if (match0.seeds[1] === -1) {
        updateNextReady(state, s, seed, false)
      }
    }
  } else {
    if (status === 'ready1' || status === 'ready') {
    } else if (status === 'ready2') {
      status = 'ready'
    } else if (status === '' || status === 'progress') {
      status = 'ready1'
      if (match0.seeds[1] === -1) {
        updateNextReady(state, s, seed, false)
      }
    }
  }
  // update json
  if (state.scores[s + 1][updateIfSingle ? 0 : 1][Math.floor(j1 / 2)]) {
    state.scores[s + 1][updateIfSingle ? 0 : 1][Math.floor(j1 / 2)][2] = status
    // console.log('score', state.scores[s + 1][i0][Math.floor(j0 / 2)])
  }
}

function updateNextMatches (state, s, i, j, p1, p2) {
  // console.log(i, j, p1, p2)
  if (i < state.seeds[s].length - 1) {
    let { i0, j0 } = getNextSeed(state, p1, s, i)
    if (p1 !== -1 && j0 !== -1) {
      let status = state.scores[s][i0][Math.floor(j0 / 2)][2]
      // const match0 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        if (status === 'ready1') {
          status = 'ready'
        } else if (status === '' || status === 'progress') {
          status = 'ready2'
        }
      } else {
        if (status === 'ready2') {
          status = 'ready'
        } else if (status === '' || status === 'progress') {
          status = 'ready1'
        }
      }
      if (state.scores[s][i0][Math.floor(j0 / 2)]) {
        state.scores[s][i0][Math.floor(j0 / 2)][2] = status
        // console.log(state.scores[s][i0][Math.floor(j0 / 2)])
      }
    }
    ({ i0, j0 } = getNextSeed(state, p2, s, i))
    if (p2 !== -1 && j0 !== -1) {
      let status = state.scores[s][i0][Math.floor(j0 / 2)][2]
      // const match1 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        if (status === 'ready1') {
          status = 'ready'
        } else if (status === '' || status === 'progress') {
          status = 'ready2'
        }
      } else {
        if (status === 'ready2') {
          status = 'ready'
        } else if (status === '' || status === 'progress') {
          status = 'ready1'
        }
      }
      if (state.scores[s][i0][Math.floor(j0 / 2)]) {
        state.scores[s][i0][Math.floor(j0 / 2)][2] = status
      }
    }
  }
}

function updateNextMatchCurves (state, s, i, j, p1, p2, isFinished) {
  if (i < state.seeds[s].length - 1) {
    let { i0, j0 } = getNextSeed(state, p1, s, i)
    // console.log( i, j, p1, p2, i0, j0)
    if (p1 !== -1 && j0 !== -1) {
      const match0 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        updateMatchCurve(match0.curves[1], state, p1, match0.order[0], match0.order[1], match0.order[2], 1,
          { color: isFinished ? state.colors[p1] : null, shiftX: match0.curvesShiftX[1] })
      } else {
        updateMatchCurve(match0.curves[0], state, p1, match0.order[0], match0.order[1], match0.order[2], 0,
          { color: isFinished ? state.colors[p1] : null, shiftX: match0.curvesShiftX[0] })
      }
    }
    ({ i0, j0 } = getNextSeed(state, p2, s, i))
    if (p2 !== -1 && j0 !== -1) {
      const match1 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        updateMatchCurve(match1.curves[1], state, p2, match1.order[0], match1.order[1], match1.order[2], 1,
          { color: isFinished ? state.colors[p2] : null, shiftX: match1.curvesShiftX[1] })
      } else {
        updateMatchCurve(match1.curves[0], state, p2, match1.order[0], match1.order[1], match1.order[2], 0,
          { color: isFinished ? state.colors[p2] : null, shiftX: match1.curvesShiftX[0] })
      }
    }
  }
}

function updateMatchCurve (curv, state, p1, s, i, j, pos1, { color, shiftX }) {
  // if (s === 1 && i > 0) return
  if (i === 0) {
    if (s === 1) {
      const j1 = state.seeds[s][0].indexOf(p1)
      // console.log(p1, j1, state.seeds[s][0])
      updateStageCurve(state, s - 1, p1, i, j, j1, curv, { color, shiftX })
      return
    }
  }
  let { i0, j0 } = getPrevSeed(state, p1, s, i)
  const pos0 = (i0 === 0 && state.matches[s][i0][Math.floor(j0 / 2)].seeds[1] === -1) ? 0.5 : j0 % 2
  j0 = j0 % 2 ? j0 - 1 : j0
  curv.d = getCurve(
    state.mesh[s][i0][j0] + state.settings.matchWidth,
    state.mesh[s][i0][j0 + 1] + state.settings.matchHeight / 4 + pos0 * 30,
    state.mesh[s][i][j * 2] + 0,
    state.mesh[s][i][j * 2 + 1] + state.settings.matchHeight / 4 + pos1 * 30, shiftX)
  curv.color = color || state.settings.defaultCurveColor
  curv.dash = color ? 0 : 2
}

function createMatchCurve (state, p1, s, i, j, pos1, { color, shiftX }) {
  // if (s === 1 && i > 0) return
  let { i0, j0 } = getPrevSeed(state, p1, s, i)
  if (j0 === -1) {
    console.error('wrong order', p1, i, j)
    return null
  }
  // console.log(state.matches[s], i0, j0)
  const match = state.matches[s][i0][Math.floor(j0 / 2)]
  if (!match) {
    console.error('wrong match', s, i0, j0)
    return null
  }
  const pos0 = (i0 === 0 && match.seeds[1] === -1) ? 0.5 : j0 % 2
  j0 = j0 % 2 ? j0 - 1 : j0
  return {
    d: getCurve(
      state.mesh[s][i0][j0] + state.settings.matchWidth,
      state.mesh[s][i0][j0 + 1] + (state.settings.matchHeight / 4 + pos0 * 30),
      state.mesh[s][i][j * 2] + 0,
      state.mesh[s][i][j * 2 + 1] + state.settings.matchHeight / 4 + pos1 * 30, shiftX),
    color: color || state.settings.defaultCurveColor,
    dash: color ? 0 : 2
  }
}

function createTopCurves (state, stage) {
  const sizes = state.settings.finalsSizes
  // if (s < state.info.stages.length) return
  let place = 0
  let fin = 0
  let offset = sizes[fin]
  for (let k = 0; k < state.settings.fin.length; k++) {
    const order = state.settings.fin[k]
    const s = order[0]
    const i = order[1]
    const j = order[2]
    const p = order[3]
    const status = state.scores[s][i][j][2]
    if (k + 1 > offset) {
      fin++
      place -= offset
      if (fin < sizes.length) {
        offset += sizes[fin]
      } else {
        offset += 100000
      }
    }
    // console.log(1111, k, fin, offset, status, seeds)
    // console.log(state.scores[s][i][j])
    if (status === 'win1') {
      const seed = state.seeds[s][i][j * 2 + p]
      state.places[s][k] = {
        fin,
        place,
        seed,
        order: [s, i, j, p]
      }
      state.curves2[2][seed] = createFinCurve(state, s, seed, fin, place)
    } else if (status === 'win2') {
      const seed = state.seeds[s][i][j * 2 + (1 - p)]
      state.places[s][k] = {
        fin,
        place,
        seed,
        order: [s, i, j, (1 - p)]
      }
      state.curves2[2][seed] = createFinCurve(state, s, seed, fin, place)
    } else {
      state.places[s][k] = {
        fin,
        place,
        seed: -1
      }
    }
    place++
  }
}

function redrawPlayersCurves (state, s) {
  console.log('redraw stage curves')
  for (let seed = 0; seed < state.players.length; seed++) {
    if (state.curves2[0][seed]) {
      updatePlayersCurve(state, seed, state.curves2[0][seed], { color: state.colors[seed], shiftX: 0 })
    } else {
      state.curves2[0][seed] = createPlayersCurve(state, seed, { color: state.colors[seed], shiftX: 0 })
      // state.curves[0].push(state.curves2[seed])
      // position in stage 0 groups
      let { i0, j0 } = getStage0Position(state, seed)
      // position in finals
      const j1 = state.seeds[1][0].indexOf(seed)
      if (j1 !== -1 && i0 !== -1 && j0 !== -1) {
        let curve1
        let status = state.scores[1][0][Math.floor(j0 / 2)][2]
        // console.log(status)
        // const match0 = state.matches[1][0][Math.floor(j1 / 2)]
        if (j1 % 2) {
          if (status === 'ready2' || status === 'ready' || status === 'win1' || status === 'win2') {
            curve1 = createStageCurve(state, s, seed, i0, j0, j1, { color: state.colors[seed], shiftX: (i0 - 2) * 0.12 + (j0 - 1) * 0.05 })
          }
        } else {
          if (status === 'ready1' || status === 'ready' || status === 'win1' || status === 'win2') {
            curve1 = createStageCurve(state, s, seed, i0, j0, j1, { color: state.colors[seed], shiftX: (i0 - 2) * 0.12 + (j0 - 1) * 0.05 })
          }
        }
        if (!curve1) {
          let f0 = 0
          const rule = state.settings.rule[s]
          while (f0 < rule.length) {
            if ((rule[f0][0] === i0 + 1) && (rule[f0][1] === j0 + 1)) {
              // console.log('finale place: ', f0)
              break
            }
            f0++
          }
          // temp fix
          if (f0 === 21) {
            f0 = 19
          }
          curve1 = createStageCurve(state, s, seed, i0, j0, f0, { color: null, shiftX: 0 })
        }
        // state.curves2[1][seed] = curve1
        Vue.set(state.curves2[1], seed, curve1)
        // state.curves[0].push(curve1)
      }
    }
  }
}

function updatePlayersCurve (state, seed, curv, { color, shiftX }) {
  let { i0, j0 } = getStage0Position(state, seed)
  curv.d = getCurve(
    state.settings.playersPosition[0] + state.settings.playersWidth,
    state.settings.playersPosition[1] + seed * 30 + 44,
    0,
    state.groups[0][i0].position[1] + j0 * 30 + 44,
    shiftX || (j0 - 2) * 0.12)
  curv.color = color || state.settings.defaultCurveColor
  curv.dash = color ? 0 : 2
}

function createPlayersCurve (state, seed, { color, shiftX }) {
  let { i0, j0 } = getStage0Position(state, seed)
  return {
    d: getCurve(
      state.settings.playersPosition[0] + state.settings.playersWidth + 20,
      state.settings.playersPosition[1] + seed * 30 + 44,
      0,
      state.groups[0][i0].position[1] + j0 * 30 + 44,
      shiftX || (j0 - 2) * 0.12),
    color: color || state.settings.defaultCurveColor,
    dash: color ? 0 : 2
  }
}

function createStageCurve (state, s, seed, i0, j0, j1, { color, shiftX }) {
  let pos0 = j1 % 2
  // console.log(2222, seed, j1, state.matches[s + 1][0][Math.floor(j1 / 2)].position[1])
  if (state.matches[s + 1][0][Math.floor(j1 / 2)].seeds[1] === -1) { // single
    pos0 = 0.5
  }
  // console.log(2222, j0, i0, s, seed, state.mesh[s + 1][0][j0], state.groups[s][i0].position)
  // console.log(f0, pos0, state.mesh[s + 1][0][f0 * 2 + 1], state.matches[s + 1][0][f0].position[pos0])
  return {
    d: getCurve(
      state.groups[s][i0].position[0] + state.settings.groupsRowWidth[s],
      state.groups[s][i0].position[1] + j0 * 30 + 44,
      state.matches[s + 1][0][Math.floor(j1 / 2)].position[0] + state.settings.stagesPosition[s + 1][0],
      state.matches[s + 1][0][Math.floor(j1 / 2)].position[1] + state.settings.stagesPosition[s + 1][1] + state.settings.matchHeight / 4 + pos0 * 30,
      shiftX || (i0 - 2) * 0.12),
    color: color || state.settings.defaultCurveColor,
    dash: color ? 0 : 2
  }
}

function updateStageCurve (state, s, seed, i0, j0, j1, curv, { color, shiftX }) {
  let pos0 = j1 % 2
  if (state.matches[s + 1][0][Math.floor(j1 / 2)].seeds[1] === -1) { // single
    pos0 = 0.5
  }
  // console.log(seed, '-->', j1)
  // console.log(2222, j0, i0, s, seed, state3.mesh[s + 1][0][j0], state.groups[s][i0].position)
  // console.log(f0, pos0, state.mesh[s + 1][0][f0 * 2 + 1], state.matches[s + 1][0][f0].position[pos0])
  curv.d = getCurve(
    state.groups[s][i0].position[0] + state.settings.groupsRowWidth[s],
    state.groups[s][i0].position[1] + j0 * 30 + 44,
    state.matches[s + 1][0][Math.floor(j1 / 2)].position[0] + state.settings.stagesPosition[s + 1][0],
    state.matches[s + 1][0][Math.floor(j1 / 2)].position[1] + state.settings.stagesPosition[s + 1][1] + state.settings.matchHeight / 4 + pos0 * 30,
    shiftX || (i0 - 2) * 0.12)
  curv.color = color || state.settings.defaultCurveColor
  curv.dash = color ? 0 : 2
}

function createFinCurve (state, s, seed, fin, place) {
  let { i0, j0 } = getLastSeed(state, seed, s)
  let pos0 = j0 % 2
  return {
    d: getCurve(
      state.matches[s][i0][Math.floor(j0 / 2)].position[0] + state.settings.stagesPosition[s][0] + state.settings.matchWidth,
      state.matches[s][i0][Math.floor(j0 / 2)].position[1] + state.settings.stagesPosition[s][1] + state.settings.matchHeight / 4 + pos0 * 30,
      state.settings.placesPosition[fin][0] + state.settings.stagesPosition[1][0],
      state.settings.placesPosition[fin][1] + state.settings.stagesPosition[1][1] + place * 30 + 44,
      (i0 - 2) * 0.12),
    color: state.colors[seed],
    dash: 0
  }
}

function updateFinCurve (state, s, seed, fin, place, curv, { color, shiftX }) {
  let { i0, j0 } = getLastSeed(state, seed, s)
  let pos0 = j0 % 2
  curv.d = getCurve(
    state.matches[s][i0][Math.floor(j0 / 2)].position[0] + state.settings.stagesPosition[s][0] + state.settings.matchWidth,
    state.matches[s][i0][Math.floor(j0 / 2)].position[1] + state.settings.stagesPosition[s][1] + state.settings.matchHeight / 4 + pos0 * 30,
    state.settings.placesPosition[fin][0] + state.settings.stagesPosition[1][0] + 20,
    state.settings.placesPosition[fin][1] + state.settings.stagesPosition[1][1] + place * 30 + 44,
    (i0 - 2) * 0.12)
  curv.color = state.colors[seed]
  curv.dash = 0
}

function getCurve (x0, y0, x1, y1, shiftX) {
  const dx = (x1 - x0) * 0.755
  const dy = Math.abs(y1 - y0)
  const dx2 = dy > 200 ? Math.log(dy) * 15 : 0
  return 'M' + x0 + ',' + y0 + ' ' + 'C' + (x0 + dx + dx2 * 0.6 + shiftX * dx) + ',' + y0 + ' ' + (x1 - dx - dx2 + shiftX * dx) + ',' + y1 + ' ' + x1 + ',' + y1
}

function addMatchDeltas (state, p1, p2, order) {
  const s = order[0]
  const i = order[1]
  const j = order[2]
  const deltas = state.deltas[order[0]]
  if (!deltas[p1]) {
    deltas[p1] = []
  }
  if (!deltas[p2]) {
    deltas[p2] = []
  }
  const result = state.scores[s][i][j]
  const status = result[2]
  const time = result[4]
  const delta2 = getRatingDelta(state.players[p1].rating, state.players[p2].rating, [result[0], result[1]])
  // push delta for the first player
  let value = status === 'win1' ? Math.round(delta2[0]) : Math.round(delta2[1])
  let text = value > 0 ? '+' + value : String(value)
  let rating = getDeltaRating(state, p1, deltas[p1], s, i, j) + value
  let x = getDeltaX(state, p1, deltas[p1], s)
  addDelta(deltas[p1], { x, value, text, width: text.length * 5 + 8, time, seed2: p2, order, rating })
  // push delta for the second player
  value = status === 'win2' ? Math.round(delta2[0]) : Math.round(delta2[1])
  text = value > 0 ? '+' + value : String(value)
  rating = getDeltaRating(state, p2, deltas[p2], s, i, j) + value
  x = getDeltaX(state, p2, deltas[p2], s)
  addDelta(deltas[p2], { x, value, text, width: text.length * 5 + 8, time, seed2: p1, order, rating })
  // if (p1 === 0) {
  //   console.log(delta2, deltas[p1])
  // }
}

function addDelta (deltas, delta) {
  const deltaIndex = deltas.findIndex((item) => item.order[1] === delta.order[1] && item.order[2] === delta.order[2])
  if (deltaIndex === -1) {
    Vue.set(deltas, deltas.length, delta)
  } else {
    Vue.set(deltas, deltaIndex, delta)
  }
}

function getDeltaRating (state, seed, deltas, s, i, j) {
  if (!deltas || deltas.length === 0) {
    if (s === 0) {
      return +state.players[seed].rating
    } else {
      if (state.deltas[s - 1][seed].length === 0) {
        return +state.players[seed].rating
      } else {
        const deltaLast = state.deltas[s - 1][seed][state.deltas[s - 1][seed].length - 1]
        return deltaLast.rating
      }
    }
  } else {
    const deltaIndex = deltas.findIndex((item) => item.order[1] === i && item.order[2] === j)
    return deltaIndex === -1 ? deltas[deltas.length - 1].rating : deltas[deltaIndex].rating - deltas[deltaIndex].value
  }
}

function getDeltaX (state, seed, deltas, s) {
  if (deltas.length === 0) {
    return 0
  } else {
    const deltaLast = deltas[deltas.length - 1]
    return deltaLast.x + deltaLast.width + 5
  }
}

function getRatingDelta (r1, r2, [s1, s2]) {
  if (s1 === s2) return [0, 0]
  const r = Math.abs(s1 - s2)
  const k = r === 1 ? 0.5 : r === 2 ? 0.7 : 1
  const rWin = s1 > s2 ? r1 : r2
  const rLost = s1 < s2 ? r1 : r2
  const d = rWin - rLost
  if (d < 100) {
    const d1 = (10 - (rWin - rLost) / 10) * k
    return [d1, -d1 / 2]
  } else {
    if (r === 2) {
      return [-d / 100 / 2, d / 100]
    } else if (r === 1) {
      return [-d / 20 / 2, d / 20]
    } else {
      return [0, 0]
    }
  }
}

function getStage0Position (state, seed) {
  let i0 = -1
  let j0 = -1
  const groups0 = state.groups[0]
  for (i0 = 0; i0 < groups0.length; i0++) {
    j0 = state.seeds[0][i0].indexOf(seed)
    if (j0 !== -1) {
      return { i0, j0 }
    }
  }
  return { i0: 0, j0: 0 }
}

function getStage1Position (state, s, seed) {
  let i0 = 0
  let j0 = 0
  const groups0 = state.groups[s]
  for (i0 = 0; i0 < groups0.length; i0++) {
    j0 = state.seeds[s][i0].indexOf(seed)
    if (j0 !== -1) {
      // console.log('group place: ', i0, j0)
      break
    }
  }
  let f0 = 0
  const rule = state.settings.rule[s]
  while (f0 < rule.length) {
    if ((rule[f0][0] === i0 + 1) && (rule[f0][1] === j0 + 1)) {
      console.log('finale place: ', f0)
      break
    }
    f0++
  }
  return { i0, j0, f0 }
}

function getNextStagePosition (state, s, g, i) {
  let f0 = 0
  const rule = state.settings.rule[0]
  while (f0 < rule.length) {
    if ((rule[f0][0] === g + 1) && (rule[f0][1] === i + 1)) {
      // console.log('finale place: ', f0)
      break
    }
    f0++
  }
  return f0
}

function getNextSeed (state, p1, s, i) {
  let i0 = i
  let j0 = -1
  while (i0 < state.seeds[s].length - 1) {
    i0++
    j0 = state.seeds[s][i0].indexOf(p1)
    if (j0 !== -1) {
      return { i0, j0 }
    }
  }
  return { i0, j0 }
}

function getPrevSeed (state, p1, s, i) {
  let i0 = i
  let j0 = -1
  while (i0 > 0) {
    i0--
    j0 = state.seeds[s][i0].indexOf(p1)
    if (j0 !== -1) {
      return { i0, j0 }
    }
  }
  return { i0, j0 }
}

function getLastSeed (state, p1, s) {
  let i0 = state.seeds[s].length
  let j0 = -1
  while (i0 > 0) {
    i0--
    j0 = state.seeds[s][i0].indexOf(p1)
    if (j0 !== -1) {
      return { i0, j0 }
    }
  }
  return { i0, j0 }
}

function initZoomer (state, zoomData) {
  if (zoomData) {
    state.settings.defaultZoomX = zoomData.x
    state.settings.defaultZoomY = zoomData.y
    state.settings.defaultZoomScale = zoomData.scale
  }
  const zoomer = state.zoomer
  zoomer.pan({ x: state.settings.defaultZoomX, y: state.settings.defaultZoomY })
  zoomer.zoomAtPoint(state.settings.defaultZoomScale, { x: 0, y: 0 })
  if (localStorage['zoom']) {
    const zoomStored = JSON.parse(localStorage['zoom'])
    if ((router.currentRoute.params['section'] === zoomStored.section)) {
      if (zoomStored.scale && zoomStored.scale > 0.1 && zoomStored.scale < 3) {
        zoomer.zoom(zoomStored.scale)
      }
      if (zoomStored.x && zoomStored.y) {
        zoomer.pan({ x: zoomStored.x, y: zoomStored.y })
      }
    }
  }
}

function fitGroupScores () {

}

const idealDE32 = [
  [0, 31, 16, 15, 8, 23, 24, 7, 4, 27, 20, 11, 12, 19, 28, 3, 2, 29, 18, 13, 10, 21, 26, 5, 6, 25, 22, 9, 14, 17, 30, 1],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
]

const idealDE32Mesh = [
  [0, 0, 0, 80, 0, 160, 0, 240, 0, 320, 0, 400, 0, 480, 0, 560, 0, 640, 0, 720, 0, 800, 0, 880, 0, 960, 0, 1040, 0, 1120, 0, 1200],
  [280, 40, 280, 200, 280, 360, 280, 520, 280, 680, 280, 840, 280, 1000, 280, 1160, 0, 2000, 0, 2080, 0, 2160, 0, 2240, 0, 2320, 0, 2400, 0, 2480, 0, 2560],
  [560, 120, 560, 440, 560, 760, 560, 1080, 0, 320, 0, 400, 0, 480, 0, 560, 0, 640, 0, 720, 0, 800, 0, 880, 0, 960, 0, 1020, 0, 1100, 0, 1180],
  [840, 280, 840, 920, 0, 760, 0, 1080, 0, 320, 0, 400, 0, 480, 0, 560, 0, 640, 0, 720, 0, 800, 0, 880, 0, 960, 0, 1020, 0, 1100, 0, 1180],
  [1120, 600, 840, 920, 0, 760, 0, 1080, 0, 320, 0, 400, 0, 480, 0, 560, 0, 640, 0, 720, 0, 800, 0, 880, 0, 960, 0, 1020, 0, 1100, 0, 1180]
]

const oldDE16 = [
  [0, 15, 8, 7, 4, 11, 12, 3, 2, 13, 10, 5, 6, 9, 14, 1],
  [0, 8, 4, 12, 2, 10, 6, 14, 15, 7, 11, 3, 13, 5, 9, 1],
  [0, 4, 2, 6, 14, 15, 10, 11, 12, 13, 8, 9, 7, 3, 5, 1],
  [0, 2, -1, -1, 14, 10, 12, 8, 15, 11, 13, 9, 7, 5, 3, 1],
  [-2, -2, 4, 14, 6, 12, 10, 8, 15, 13, 11, 9, -1, -1, -1, -1],
  [-2, -2, 4, 6, 14, 12, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
]

const idealDE16 = [
  [0, 15, 8, 7, 4, 11, 12, 3, 2, 13, 10, 5, 6, 9, 14, 1],
  [0, 8, 4, 12, 2, 10, 6, 14, 15, 7, 11, 3, 13, 5, 9, 1],
  [0, 4, 2, 6, 10, 15, 14, 11, 8, 13, 12, 9, 7, 3, 5, 1],
  [0, 2, -1, -1, 10, 14, 8, 12, 15, 11, 13, 9, 7, 5, 3, 1],
  [-2, -2, 4, 10, 6, 8, 14, 12, 15, 13, 11, 9, -1, -1, -1, -1],
  [-2, -2, 4, 6, 10, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-2, -2, 2, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [0, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
]

const idealDE16Mesh = [
  [0, 0, 0, 80, 0, 160, 0, 240, 0, 320, 0, 400, 0, 480, 0, 560],
  [320, 40, 320, 200, 320, 360, 320, 520, 320, 650, 320, 730, 320, 810, 320, 890],
  [640, 120, 640, 420, 640, 650, 640, 730, 640, 810, 640, 890, 640, 1000, 640, 1080],
  [1280, 270, 940, 460, 960, 650, 960, 730, 960, 810, 960, 890, 960, 1000, 960, 1080],
  [1300, 280, 1280, 480, 1280, 560, 1280, 690, 1280, 810, 1280, 890, 1300, 1100, 1300, 1010],
  [1740, 270, 1600, 480, 1600, 560, 1600, 1010, 1740, 550, 1600, 740, 1600, 840, 1600, 920],
  [1740, 270, 1860, 370, 1740, 550, 1600, 1010, 1740, 550, 1600, 740, 1600, 840, 1600, 920],
  [2120, 270, 2120, 480, 1740, 550, 1600, 1010, 1740, 550, 1600, 740, 1600, 840, 1600, 920]
]

const oldDE16Mesh = [
  [0, 0, 0, 80, 0, 160, 0, 240, 0, 320, 0, 400, 0, 480, 0, 560],
  [420, 40, 420, 200, 420, 360, 420, 520, 420, 690, 420, 770, 420, 850, 420, 930],
  [840, 120, 840, 420, 840, 690, 840, 770, 840, 850, 840, 930, 840, 1060, 840, 1150],
  [1440, 270, 940, 460, 1140, 690, 1140, 770, 1140, 850, 1140, 930, 1140, 1060, 1140, 1150],
  [1300, 280, 1440, 470, 1440, 550, 1440, 730, 1440, 850, 1440, 930, 1300, 1100, 1300, 1010],
  [1600, 280, 1740, 470, 1740, 550, 1600, 1010, 1740, 550, 1600, 740, 1600, 840, 1600, 920]
]

const idealDE16MeshCompact = [
  [0, 0, 0, 90, 0, 180, 0, 270, 0, 360, 0, 450, 0, 540, 0, 630],
  [320, 0, 320, 80, 320, 160, 320, 240, 320, 390, 320, 470, 320, 550, 320, 630],
  [640, 0, 640, 80, 640, 190, 640, 270, 640, 350, 640, 430, 640, 540, 640, 630],
  [980, 0, 940, 460, 980, 190, 980, 270, 980, 350, 980, 430, 980, 540, 980, 630],
  [1300, 280, 1320, 190, 1320, 110, 1320, 270, 1320, 350, 1320, 430, 1300, 1100, 1300, 1010],
  [1600, 280, 1640, 190, 1600, 1100, 1600, 1010, 1640, 110, 1600, 740, 1600, 840, 1600, 920]
]
