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
      role: localStorage['role'] || '',
      defaultCurveColor: '#cccccc',
      defaultChevronColor: '#dddddd',
      defaultZoomX: 20,
      defaultZoomY: 20,
      defaultZoomScale: 0.9,
      showLogo: true,
      nameWidth: 210,
      shortType: '',
      pairWidth: 300,
      matchWidth: 220,
      matchHeight: 60,
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
      readyMatches: []
    },
    colors: ['#ff0500', '#0074d9', '#01ff70', '#fff100', '#c200ff', '#00f9ff', '#ff8c00', '#ff00bc', '#003f83', '#B50002', '#019e47', '#a7a400', '#7b009d', '#00969b', '#773b00', '#990063', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd', '#7fdbff', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd', '#7fdbff', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd'],
    // players: JSON.parse('[{"name":"Казачев Станислав Александрович","location":"Самарская обл., Чапаевск","rating":"638.73"},{"name":"Токарев Александр Алексеевич","location":"Самарская обл., Самара","rating":"667.28"},{"name":"Божко Данила Николаевич","location":"Самара","rating":"572.14"},{"name":"Стешин Михаил Алексеевич","location":"Самарская обл., Самара","rating":"687.74"},{"name":"Бахметьев Валерий Николаевич","location":"Самарская обл., Самара","rating":"655.51"},{"name":"Бурачек Владимир Николаевич","location":"Самарская обл., Кинель","rating":"615.49"},{"name":"Прохоров Александр Николаевич","location":"Самарская обл., Самара","rating":"631.18"},{"name":"Усманов Александр Владимирович","location":"Самарская обл., Самара","rating":"616.32"},{"name":"Ельшов Максим Викторович","location":"Самарская обл., Самара","rating":"629.55"},{"name":"Клушин Анатолий Федорович","location":"Самарская обл., Самара","rating":"560.99"},{"name":"Хуснутдинов Ерлан Георгиевич","location":"Самарская обл., Самара","rating":"627.76"},{"name":"Петров Антон Владимирович","location":"Самарская обл., Самара","rating":"639.99"},{"name":"Коба Александр Владимирович","location":"Самарская обл., Самара","rating":"633.81"},{"name":"Емельянов Андрей Николаевич","location":"Самарская обл., Самара","rating":"599.38"},{"name":"Гурков Дмитрий Анатольевич","location":"Самарская обл., Самара","rating":"585.37"},{"name":"Арапов Александр Алексеевич","location":"Самарская обл., Самара","rating":"584.96"},{"name":"Гусев Андрей Николаевич","location":"Самарская обл., Самара","rating":"543.26"},{"name":"Кузнецов Кирилл Дмитриевич","location":"Самарская обл., Самара","rating":"429.03"},{"name":"Засорёнков Сергей Владимирович","location":"Самарская обл., Самара","rating":"594.59"},{"name":"Леонтьев Алексей Александрович","location":"Самарская обл., Самара","rating":"563.92"},{"name":"Вирюжский Николай Викторович","location":"Самарская обл., Самара","rating":"492.80"},{"name":"Борщевский Юрий Давидович","location":"Самарская обл., Самара","rating":"589.45"},{"name":"Федяев Антон Вадимович","location":"Самарская обл., Самара","rating":"446.67"},{"name":"Ширяев Михаил Викторович","location":"Самарская обл., Самара","rating":"508.35"},{"name":"Гафиатулин Чингиз Тагирович","location":"Самарская обл., Самара","rating":"607.46"},{"name":"Солдаткин Дмитрий Викторович","location":"Самарская обл., Самара","rating":"591.42"},{"name":"Федин Дмитрий Игоревич","location":"Самарская обл., Самара","rating":"437.04"},{"name":"Кравченко Денис Константинов","location":"Самарская обл., Самара","rating":"353.33"},{"name":"Кукорин Марат Алексеевич","location":"Самарская обл., Самара","rating":"515.36"},{"name":"Король Михаил Анатольевич","location":"Самарская обл., Самара","rating":"548.40"},{"name":"Гуленков Олег Витальевич","location":"Самарская обл., Самара","rating":"446.42"},{"name":"Лучкин Вадим Игоревич","location":"Самарская обл., Самара","rating":"558.64"}]'),
    // players: JSON.parse('[{"name":"Добренький Артём Николаевич","location":"Крым, Ялта","rating":"690.48"},{"name":"Чекалов Дмитрий Геннадьевич","location":"Крым, Ялта","rating":"471.74"},{"name":"Груздов Дарион Сергеевич","location":"Крым, Ялта","rating":"481.34"},{"name":"Невский Александр Александрович","location":"Крым, Ялта","rating":"504.61"},{"name":"Широких Тимур Иванович","location":"Крым, Севастополь","rating":"489.13"},{"name":"Груздов Даниэль Сергеевич","location":"Крым, Ялта","rating":"410.87"},{"name":"Ирижепов Сергей Булатович","location":"Екатеринбург","rating":"407.31"},{"name":"Гладунов Александр Витальевич","location":"Крым, Ялта","rating":"376.21"},{"name":"Груздов Сергей Николаевич","location":"Крым, Ялта","rating":"425.73"},{"name":"Калугин Артём Олегович","location":"Крым, Алушта","rating":"223.68"},{"name":"Пичугов Сергей Леонидович","location":"Крым, Алушта","rating":"220.57"},{"name":"Корзанов Михаил Владимирович","location":"Крым, Ялта","rating":"364.81"},{"name":"Марченко Андрей Иванович","location":"Крым, Орлиное","rating":"352.11"},{"name":"Коваль Николай Александрович","location":"Крым, Симферополь","rating":"257.75"},{"name":"Ланье Владимир Георгиевич","location":"Крым, Ялта","rating":"179.72"},{"name":"Атутова Наталья Антоновна","location":"Бурятия, Улан-Удэ","rating":"120.02"}]'),
    // JSON.parse('[{"name":"Юдин Валерий Витальевич","location":"Новосибирская обл., Новосибирск","rating":"511.41"},{"name":"Солдатов Евгений Анатольевич","location":"Новосибирская обл., Новосибирск","rating":"457.05"},{"name":"Ефременко Всеволод Даниилович","location":"Новосибирская обл., Новосибирск","rating":"490.23"},{"name":"Насыбуллов Тимур Ринатович","location":"Новосибирская обл., Новосибирск","rating":"384.38"},{"name":"Колодный Денис Владимирович","location":"Новосибирская обл., Новосибирск","rating":"461.80"},{"name":"Жаринов Алексей Сергеевич","location":"Новосибирская обл., Новосибирск","rating":"329.63"},{"name":"Шинкевич Сергей Анатольевич","location":"Новосибирская обл., Бердск","rating":"416.29"},{"name":"Паньшин Виктор Владимирович","location":"Новосибирская обл, Новосибирск","rating":"399.07"},{"name":"Лущинский Александр Владимирович","location":"Новосибирская обл., Бердск","rating":"290.69"},{"name":"Васильев Алексей Сергеевич","location":"Новосибирская обл., Новосибирск","rating":"302.01"},{"name":"Наумов Дмитрий Николаевич","location":"Новосибирская обл., Новосибирск","rating":"204.96"},{"name":"Свиридов Евгений Юрьевич","location":"Новосибирская обл., Новосибирск","rating":"208.49"},{"name":"Ковалева Екатерина Александровна","location":"Новосибирская обл., Новосибирск","rating":"150.51"},{"name":"Рудых Ярослав Игоревич","location":"Новосибирская обл., Новосибирск","rating":"131.57"},{"name":"Михеев Юрий Викторович","location":"Новосибирская обл., Новосибирск","rating":"126.50"}]'),
    info: {},
    stages: [],
    players: [],
    matches: null,
    groups: null,
    places: [],
    scores: [],
    curves: [],
    seeds: [],
    medias: [],
    mesh: []
  },
  mutations: {
    initialize (state, section) {
      if (section) {
        const host = window.location.hostname.indexOf('localhost') === -1 ? 'https://azoft.tk/' : ''
        console.log(host)
        // const host = window.location.hostname.indexOf('localhost') === -1 ? 'https://raw.githubusercontent.com/chumakov-azoft/azoft-tk/master/' : ''
        state.settings.base = 'events/' + section + '/'
        const rand = Math.random()
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
          state.settings.rtype = state.info.rtype
          state.settings.shortType = state.info.shortType
          state.settings.nameWidth = state.info.nameWidth
          state.settings.stretchNames = state.info.stretchNames
          state.settings.showLogo = state.info.showLogo
          state.stages = state.info.stages
          state.players = values[1].data.players
          state.mesh = values[2].data.mesh
          state.seeds = values[3].data.seeds
          state.scores = values[4].data.scores
          state.medias = values[5].data.medias
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
        if (!state.edit.itemToSwitch) {
          state.edit.itemToSwitch = [ ...order ]
        } else {
          outHalf(state, {})
          switchOrder(state, state.edit.itemToSwitch, order, !$event.altKey)
          state.edit.itemToSwitch = null
          overHalf(state, { order })
        }
      } else if ($event.shiftKey) {
        state.edit.itemsToMove.push(state.matches[s][i][j])
      } else {
        // console.log(state.matches[s][i][j].names[p])
        if (i === 0 && state.matches[s][i][j].names[p].indexOf('Записывайтесь') !== -1) {
          document.location.href = 'tg://t.me/joinchat/FMaTykiB1RIoc7PMD5RTkQ'
        }
        state.edit.itemsToMove = [state.matches[s][i][j]]
      }
    }
  },
  actions: {
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
      const host = window.location.hostname.indexOf('localhost') === -1 ? 'https://azoft.tk/' : ''
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
    setGroupProgress ({ state, commit }) {
      setGroupProgress(state, state.edit.current)
    },
    deleteGroupResult ({ state, commit }) {
      deleteGroupScore(state, state.edit.current)
    },
    setGroupResult ({ state, commit }, key) {
      if (!state.edit.next) {
        setGroupScore(state, state.edit.current, key)
        // commit('setGroupScore', state.edit.current, key)
        state.edit.next = true
        if (key >= state.settings.maxScore || key === 'Tex') {
          setGroupWinner(state, state.edit.current)
          setGroupScore(state, state.edit.current, 0, true)
          // commit('setGroupWinner')
          // commit('setGroupScore', state.edit.current, 0, true)
        } else {
          setGroupWinner(state, state.edit.current, true)
          setGroupScore(state, state.edit.current, state.settings.maxScore, true)
          // commit('setGroupWinner', state.edit.current, true)
          // commit('setGroupScore', state.edit.current, state.settings.maxScore, true)
        }
      } else {
        setGroupScore(state, state.edit.current, key, true)
        // commit('setGroupScore', state.edit.current, key, true)
        state.edit.next = false
        if (key >= state.settings.maxScore /* && ['win1', 'win2'].indexOf(state.matches[s][index][count].status) === -1 */) {
          setGroupWinner(state, state.edit.current)
          // commit('setGroupWinner', state.edit.current)
        }
      }
    },
    setMatchResult ({ state, commit }, key) {
      const s = state.edit.current[0]
      const i = state.edit.current[1]
      const j = state.edit.current[2]
      const p = state.edit.current[3]
      const match = state.matches[s][i][j]
      if (match.status === 'single' || match.status === 'ready1' || match.status === 'ready2') {
        return
      }
      outHalf(state, {})
      if (!state.edit.next) {
        setMatchScore(state, s, i, j, p, key)
        // commit('setMatchScore', { i, j, p, score: key })
        state.edit.next = true
        if (key >= state.settings.maxScore || key === 'Tex') {
          setMatchWinner(state, s, i, j, p)
          setMatchScore(state, s, i, j, 1 - p, 0)
          // commit('setMatchWinner', { i, j, p })
          // commit('setMatchScore', { i, j, p: 1 - p, score: 0 })
        } else {
          setMatchWinner(state, s, i, j, 1 - p)
          setMatchScore(state, s, i, j, 1 - p, state.settings.maxScore)
          // commit('setMatchWinner', { i, j, p: 1 - p })
          // commit('setMatchScore', { i, j, p: 1 - p, score: state.settings.maxScore })
        }
      } else {
        setMatchScore(state, s, i, j, 1 - p, key)
        // commit('setMatchScore', { i, j, p: 1 - p, score: key })
        state.edit.next = false
        if (key >= state.settings.maxScore && ['win1', 'win2'].indexOf(state.matches[s][i][j].status) === -1) {
          setMatchWinner(state, s, i, j, p)
          // commit('setMatchWinner', { i, j, p })
        }
      }
      setTimeout(() => overHalf(state, { order: [ s, i, j, p ] }))
    },
    moveObjects ({ state, commit }, { dx, dy }) {
      state.edit.itemsToMove.forEach((match) => {
        if (match.seeds) {
          const [s, i, j] = match.order
          const [p1, p2] = match.seeds
          match.position = [state.mesh[i][j * 2] = match.position[0] + dx, state.mesh[i][j * 2 + 1] = match.position[1] + dy]
          let isFinished = match.status === 'win1' || match.status === 'win2'
          let isReady = match.status === 'win1' || match.status === 'win2' || match.status === 'ready'
          if (match.curves) {
            updateCurve(match.curves[0], state, p1, match.order[0], match.order[1], match.order[2], 0,
              { color: isReady || match.status === 'ready1' ? state.colors[p1] : null, shiftX: match.curvesShiftX[0] })
            updateCurve(match.curves[1], state, p2, match.order[0], match.order[1], match.order[2], 1,
              { color: isReady || match.status === 'ready2' ? state.colors[p2] : null, shiftX: match.curvesShiftX[1] })
          }
          updateNextCurves(state, s, i, j, p1, p2, isFinished)
        } else { // media
          match[1] += dx
          match[2] += dy
          console.log(match.join(', '))
          Vue.set(state.medias, 0, state.medias[0])
        }
      })
      console.log('------')
      let meshOut = ''
      state.mesh.forEach((meshArr) => {
        meshOut += '[' + meshArr.join(', ') + '],\n'
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
          JSON.stringify({ players: state.players0.map(({ short, currentRating, ...items }) => items),
            pairs: state.players.map(({ location, location2, currentRating, ...items }) => items)
          }).replace('{', '{\n').replace('[', '[\n').replace(/",/gm, '",\n').replace(/"pairs"/gm, '\n"pairs"').replace(/}/gm, '\n}').replace(/{/gm, '{\n'),
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
        /* git.saveFile('players.json', JSON.stringify({
          players: state.players0.map(({ short, currentRating, ...items }) => items),
          pairs: state.players.map(({ location, location2, currentRating, ...items }) => items)
        }).replace('{', '{\n').replace('[', '[\n').replace(/",/gm, '",\n').replace(/"pairs"/gm, '\n"pairs"').replace(/}/gm, '\n}').replace(/{/gm, '{\n')) */
        git.saveFile('scores.json', JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
      } else {
        git.saveFile('seeds.json', JSON.stringify({ seeds: state.seeds }).replace('[[', '[\n[').replace(/\],\[/gm, '],\n['))
        git.saveFile('scores.json', JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
      }
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
    let player2 = state.players0[l - i - 1]
    let r1 = player1.currentRating
    let r2 = player2.currentRating
    let w = (r1 - r2) / (r1 + r2) / 2.5 + 0.5
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
      currentRating: r,
      rating: r
    }
  }
  state.players.sort((a, b) => {
    return b.currentRating - a.currentRating
  })
}

function preparePlayers (state, seedArr) {
  const nameSet = new Set()
  state.players.map((player) => {
    player.currentRating = +player.rating
    const names = player.name.split(' ')
    player.short = names[0]
    if (names.length > 1) {
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
        player.logo = state.settings.base + player.logo
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
  state.curves = []
  state.matches = []
  state.groups = []
  state.readyMatches = []
  if (state.stages) {
    state.stages.forEach((stageType, stage) => {
      console.log(stageType, stage)
      if (stageType === 'groups') {
        Vue.set(state.groups, stage, [])
        Vue.set(state.places, stage, [])
        createGroups(state, stage, state.groups[stage], state.mesh[stage], state.seeds[stage], state.scores[stage], state.places[stage], state.players)
      }
      if (stageType === 'finals') {
        Vue.set(state.matches, stage, [])
        Vue.set(state.places, stage, [])
        createFinals(state, stage, state.matches[stage], state.mesh[stage], state.seeds[stage], state.scores[stage], state.places[stage], state.players)
      }
    })
  } else {
    createFinals(state, 0, state.mesh, state.seeds, state.scores)
  }
  // Vue.set(state.stages, 0, state.stages[0])
  // setTimeout(() => Vue.set(state, 'stages', state.stages), 1000)
  // console.log(state.matches)
  // console.log(state.places)
}

function createGroups (state, s, groups, mesh, seeds, scores, places, players) {
  console.log(s, mesh, mesh.length, seeds, scores)
  for (let g = 0; g < mesh.length; g++) {
    if (!seeds[g]) {
      continue
    }
    /* const groupSeeds = seeds[g]
     const groupSeedsLen = groupSeeds.length
    let groupScores = scores[g]
    if (!groupScores) {
      Vue.set(scores, g, [])
      groupScores = scores[g]
      // groupScores = []
    }
    groupScores.length = groupSeedsLen
    for (let j = 0; j < groupSeedsLen; j++) {
      if (!groupScores[j]) {
        Vue.set(groupScores, j, [])
        // groupScores[j] = []
      }
      for (let k = 0; k < groupSeedsLen; k++) {
        if (k === j) {
          if (groupScores[j][k]) {
            Vue.set(groupScores[j], k, null)
          }
        } else if (!groupScores[j][k]) {
          Vue.set(groupScores[j], k, [0, 0, '', 0, 0])
          // groupScores[j][k] = [0, 0, '']
        }
      }
      // groupScores[j].length = groupSeedsLen
    } */
    groups.push({
      index: g,
      stage: s,
      order: [s, g],
      seeds: seeds[g],
      position: [mesh[g][0], mesh[g][1]]
    })

    const len = seeds[g].length
    places.push(Array(len))
    calcGroupPlaces(state, seeds[g], scores[g], places[g])
  }
}

function calcGroupPlaces (state, seeds, scores, places) {
  let finished = 0
  const current = []
  const len = scores.length
  for (let i = 0; i < len; i++) {
    current[i] = { min: 0, max: 0, index: i }
    for (let j = 0; j < len; j++) {
      const result = scores[i][j]
      // console.log(result)
      if (!result) {
        continue
      }
      if (result[2] === 'win1') {
        current[i].min += 2
        current[i].max += 2
        finished++
      } else if (result[2] === 'win2') {
        current[i].min += 1
        current[i].max += 1
        finished++
      } else {
        current[i].max += 2
      }
    }
  }
  // too few games
  if (finished < len) {
    current.forEach((item, index) => {
      Vue.set(places, item.index, [1, len])
    })
    return
  }
  // all games
  if (finished === len * len - len) {
    current.sort((a, b) => b.max - a.max)
    console.log('full', current)
    for (let i = 0; i < current.length - 1; i++) {
      i += resolveGroupPlaces(scores, current, i, i + 1)
    }
    current.forEach((item, index) => {
      Vue.set(places, item.index, item.split ? [item.split] : [index + 1])
      if (index < 3) {
        if (!item.split) {
          setTimeout(() => document.querySelectorAll('#player' + seeds[item.index] + ':not(.empty)').forEach((element) => element.classList.add('place--' + (index + 1))))
        }
      }
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
    if (item.maxPlace <= 3) {
      if (item.minPlace === item.maxPlace) {
        setTimeout(() => document.querySelectorAll('#player' + seeds[item.index] + ':not(.empty)').forEach((element) => element.classList.add('place--' + (item.maxPlace))))
      }
    }
  })
  current.sort((a, b) => a.maxPlace - b.maxPlace)
  // sort clusters if possible
  for (let i = 0; i < current.length - 1; i++) {
    let n = resolveGroupPlaces(scores, current, i, i + 1)
    if (n > 0) {
      for (let j = i; j < i + n + 1; j++) {
        Vue.set(places, current[j].index, current[j].split ? [current[j].split] : [j + 1])
        if (j < 3) {
          if (!current[j].split) {
            setTimeout(() => document.querySelectorAll('#player' + seeds[current[j].index] + ':not(.empty)').forEach((element) => element.classList.add('place--' + (j + 1))))
          }
        }
      }
      i += n
    }
  }
  // console.log(state.places)
  // Vue.set(places, 0, places[0])
  // console.log('------', real, places, current)
}

function resolveGroupPlaces (scores, arr, start, maxPlace) {
  if (start + 1 >= arr.length || arr[start].min !== arr[start].max || arr[start + 1].min !== arr[start + 1].max || arr[start].max !== arr[start + 1].max) {
    return 0
  }
  let len = 2
  while (start + len < arr.length && arr[start].max === arr[start + len].max && arr[start + len].min === arr[start + len].max) {
    len++
  }
  if ((start > 0 && arr[start - 1].max === arr[start].max) || (start + len + 1 < arr.length && arr[start + len + 1].max === arr[start].max)) {
    return 0
  }
  console.log('resolving ' + (start + 1) + '-' + (start + len + 1) + ', score: ' + arr[start].max)
  if (len === 2) {
    let result = scores[arr[start].index][arr[start + 1].index]
    let d = result[0] - result[1]
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
        let result = scores[arr[i].index][arr[j].index]
        let d = result[0] - result[1]
        a += d
        s += ' ' + (d > 0 ? '+' + d : d) + '(' + (arr[j].index + 1) + ')'
      }
      arr[i].max += a / 100
      console.log(s + ' = ' + (a > 0 ? '+' + a : a))
    }
    let sorted = arr.splice(start, len).sort((a, b) => b.max - a.max)
    arr.splice(start, 0, ...sorted)
    let value = arr[start].max
    console.log(sorted)
    for (let i = start + 1; i < start + len; i++) {
      if (arr[i].max === value) {
        if (i + 1 === len || arr[i + 1].max !== value) {
          let result = scores[arr[i - 1].index][arr[i].index]
          let d = result[0] - result[1]
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
function createFinals (state, s, matches, mesh, seeds, scores, places, players) {
  for (let i = 0; i < seeds.length; i++) {
    let round = []
    let order = seeds[i]
    if (!scores[i]) {
      scores[i] = []
    }
    console.log(order, scores[i])
    const len = order.length / 2
    for (let j = 0; j < len; j += 1) {
      let p1 = order[j * 2]
      let p2 = order[j * 2 + 1]
      if (p1 < 0 || p2 < 0) {
        if (i === 0 && p1 >= 0) {
          round.push({
            order: [s, i, j],
            seeds: [p1, -1],
            logos: [players[p1].logo || ''],
            names: [players[p1].short],
            position: [mesh[i][j * 2], mesh[i][j * 2 + 1]],
            ratings: [Math.round(players[p1].rating)],
            scores: [''],
            status: 'single'
          })
        } else if (i === 0 && p2 >= 0) {
          round.push({
            order: [s, i, j],
            seeds: [p2, -1],
            logos: [players[p2].logo || ''],
            names: [players[p2].short],
            position: [mesh[i][j * 2], mesh[i][j * 2 + 1]],
            ratings: [Math.round(players[p2].rating)],
            scores: [''],
            status: 'single'
          })
        } else {
          round.push(null)
        }
        continue
      }
      let status = i === 0 ? 'ready' : ''
      // let status = players[p1].rating >= players[p2].rating ? 'win1' : 'win2'
      // let status = 'win1'
      if (!scores[i][j]) {
        scores[i][j] = [0, 0, status]
      } else {
        status = scores[i][j][2]
        /* if (g === 7 && j === 0) {
          status = 'win1'
        } */
        /* if (g === 7 && j === 1) {
          scores[g][j][0] = 3
          status = 'win1'
        } */
        // scores[g][j] = status === 'win1' ? [3, 0, status] : [0, 3, status]
      }
      let isReady = status === 'win1' || status === 'win2' || status === 'ready'
      let curves = null
      let curvesShiftX = null
      if (i > 0) {
        curvesShiftX = [
          getShiftX(i, j, len),
          getShiftX(i, j, len) - 0.2
        ]
        let colors = [isReady || status === 'ready1' ? state.colors[p1] : null, isReady || status === 'ready2' ? state.colors[p2] : null]
        if (i === 2 && j === 0) {
          console.log('stat', status, isReady, scores[i], colors)
        }
        curves = [
          createCurve(state, p1, s, i, j, 0, { color: colors[0], shiftX: curvesShiftX[0] }),
          createCurve(state, p2, s, i, j, 1, { color: colors[1], shiftX: curvesShiftX[1] })
        ]
        if (curves[0]) {
          state.curves.push(curves[0])
        }
        if (curves[1]) {
          state.curves.push(curves[1])
        }
      }
      if (players.length <= p1) {
        removeSeed(state, p1)
        continue
      }
      if (players.length <= p2) {
        removeSeed(state, p2)
        continue
      }
      const match = {
        order: [s, i, j],
        seeds: [p1, p2],
        curves: curves,
        curvesShiftX: curvesShiftX,
        logos: [players[p1].logo || '', players[p2].logo || ''],
        names: [players[p1].short, players[p2].short],
        position: [mesh[i][j * 2], mesh[i][j * 2 + 1]],
        ratings: [Math.round(players[p1].currentRating), Math.round(players[p2].currentRating)],
        scores: scores[i][j],
        status: status
      }
      round.push(match)
      if (status === 'win1' || status === 'win2') {
        const delta = getRatingDelta(+players[p1].rating, +players[p2].rating, scores[i][j])
        players[p1].currentRating += status === 'win1' ? delta[0] : delta[1]
        players[p2].currentRating += status === 'win1' ? delta[1] : delta[0]
      } else if (status === 'ready') {
        state.edit.readyMatches.push(match)
      }
    }
    matches.push(round)
  }
  console.log(matches)
  places.length = seeds.length
  for (let j = 0; j < seeds[0].length; j++) {
    let i = seeds.length - 1
    while (seeds[i][j] < 0) {
      i--
    }
    const p = seeds[i][j]
    const match = state.matches[s][i][Math.floor(j / 2)]
    if (match.status === 'win1' || match.status === 'win2') {
      places[j] = {
        seed: p,
        order: [s, i, Math.floor(j / 2), j % 2 ? 1 : 0],
        position: [match.position[0] + state.settings.matchWidth + 10, match.position[1] + (j % 2 ? 30 : 0)],
        rating: Math.round(players[p].currentRating),
        delta: Math.round(players[p].currentRating) - Math.round(players[p].rating),
        place: (match.status === 'win1' ? j + 1 : (j % 2 ? j : j + 2))
      }
      if (j < 3) {
        setTimeout(() => document.querySelectorAll('#player' + p + ':not(.empty)').forEach((element) => element.classList.add('place--' + (j + 1))))
      }
    }
  }
}

function overHalf (state, { order, $event }) {
  const s = order[0]
  const i = order[1]
  const j = order[2]
  const p = order[3]
  console.log('g=' + i, 'j=' + j, 'seeds:', state.matches[s][i][j].seeds.join(','), 'status:', state.matches[s][i][j].status, 'position:', state.matches[s][i][j].position.join(','), 'colors:', state.colors[state.matches[s][i][j].seeds[0]], state.colors[state.matches[s][i][j].seeds[1]])
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

function setMatchScore (state, s, i, j, p, score) {
  state.scores[s][i][j][p] = score
  Vue.set(state.matches[s][i][j].scores, p, score)
  localStorage['scores'] = JSON.stringify(state.scores)
  localStorage['seeds'] = JSON.stringify(state.seeds)
  // console.log(JSON.stringify(state.scores).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
  // console.log(JSON.stringify(state.seeds).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
}

function setMatchWinner (state, s, i, j, p) {
  const match = state.matches[s][i][j]
  const statusOld = match.status
  const statusNew = p ? 'win2' : 'win1'
  match.status = statusNew
  state.scores[i][j][2] = statusNew
  let [p1, p2] = match.seeds
  if (i + 1 < state.seeds.length && ((statusOld === 'win2' && statusNew === 'win1') || (statusOld !== 'win2' && statusNew === 'win2'))) {
    for (let k = i + 1; k < state.seeds.length; k++) {
      let index1 = state.seeds[k].indexOf(p1)
      let index2 = state.seeds[k].indexOf(p2)
      switchSeeds(state, k, index1, index2, p1, p2)
    }
  }
  updateNextMatches(state, s, i, j, p1, p2)
  updateNextCurves(state, s, i, j, p1, p2, true)
}

function overGroupCell (state, { order, $event }) {
  const s = order[0]
  const g = order[1]
  const i = order[2]
  const j = order[3]
  if ($event && (s !== state.edit.current[0] || g !== state.edit.current[1] || i !== state.edit.current[2] || j !== state.edit.current[3])) {
    console.log('s=' + s, 'g=' + g, 'g=' + i, 'j=' + j)
    // console.log('seeds:', state.seeds[s][g][g], state.seeds[s][g][j], 'status:', state.scores[s][g][g][j])
    state.edit.current = order
    state.edit.type = 'group'
    state.edit.over = [state.seeds[s][g][i], state.seeds[s][g][j]]
  }
  state.edit.over.forEach((seed) => {
    document.querySelectorAll('#player' + seed + ':not(.empty)').forEach((element) => element.classList.add('over'))
  })
  document.querySelectorAll('#group-' + state.seeds[s][g][i] + '-' + state.seeds[s][g][j] + ':not(.empty)').forEach((element) => element.classList.add('group-cell-over'))
  document.querySelectorAll('#group-' + state.seeds[s][g][j] + '-' + state.seeds[s][g][i] + ':not(.empty)').forEach((element) => element.classList.add('group-cell-over'))
  // document.querySelectorAll('#player' + state.seeds[s][g][g] + ':not(.empty)').forEach((element) => element.classList.add('over'))
  // document.querySelectorAll('#player' + state.seeds[s][g][j] + ':not(.empty)').forEach((element) => element.classList.add('over'))
}

function outGroupCell (state, { order, $event }) {
  if ($event && state.edit.current) {
    state.edit.next = false
  }
  if (state.edit.over && state.edit.over.length === 2) {
    state.edit.over.forEach((seed) => {
      document.querySelectorAll('#player' + seed + ':not(.empty)').forEach((element) => element.classList.remove('over'))
    })
    document.querySelectorAll('#group-' + state.edit.over[0] + '-' + state.edit.over[1] + ':not(.empty)').forEach((element) => element.classList.remove('group-cell-over'))
    document.querySelectorAll('#group-' + state.edit.over[1] + '-' + state.edit.over[0] + ':not(.empty)').forEach((element) => element.classList.remove('group-cell-over'))
  }
  // document.querySelectorAll('#player' + state.matches[state.edit.current[0]][state.edit.current[1]].seeds[state.edit.current[2]]).forEach((element) => element.classList.remove('over'))
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
  calcGroupPlaces(state, state.seeds[s][g], state.scores[s][g], state.places[s][g])
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
  calcGroupPlaces(state, state.seeds[s][g], state.scores[s][g], state.places[s][g])
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

function switchSeeds (state, i, index1, index2, p1, p2) {
  if (index1 !== -1) {
    state.seeds[i][index1] = p2
    setMatchSeed(state, i, index1, p2)
  }
  if (index2 !== -1) {
    state.seeds[i][index2] = p1
    setMatchSeed(state, i, index2, p1)
  }
}

function setMatchSeed (state, s, i, j, p) {
  if (!state.matches) {
    return
  }
  const match = state.matches[s][i][Math.floor(j / 2)]
  if (!match) {
    return
  }
  console.log(match, i, Math.floor(j / 2))
  let isFinished = match.status === 'win1' || match.status === 'win2'
  let isSingle = match.status === 'single'
  if (j % 2 && !isSingle) {
    match.seeds[1] = p
    match.logos[1] = state.players[p].logo
    match.names[1] = state.players[p].short
    match.ratings[1] = Math.round(state.players[p].rating)
    if (match.curves) {
      updateCurve(match.curves[1], state, p, match.order[0], match.order[1], match.order[2], 1,
        { color: isFinished ? state.colors[p] : null, shiftX: match.curvesShiftX[1] })
    }
  } else {
    match.seeds[0] = p
    match.logos[0] = state.players[p].logo
    match.names[0] = state.players[p].short
    match.ratings[0] = Math.round(state.players[p].rating)
    if (match.curves) {
      updateCurve(match.curves[0], state, p, match.order[0], match.order[1], match.order[2], 0,
        { color: isFinished ? state.colors[p] : null, shiftX: match.curvesShiftX[0] })
    }
  }
}

function removeSeed (state, p) {
  let i = 0
  while (i < state.seeds.length) {
    let j = state.seeds[i].indexOf(p)
    if (j !== -1) {
      if (j % 2) {
        state.seeds[i][j] = -1
        if (i > 0) {
          state.seeds[i][j - 1] = -1
        }
      } else {
        let p2 = state.seeds[i][j + 1]
        for (let k = i + 1; k < state.seeds.length; k++) {
          let index1 = state.seeds[k].indexOf(p)
          let index2 = state.seeds[k].indexOf(p2)
          switchSeeds(state, k, index1, index2, p, p2)
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
function switchOrder (state, order1, order2, all = true) {
  let p1 = state.matches[order1[0]][order1[1]][order1[2]].seeds[order1[3]]
  let p2 = state.matches[order2[0]][order2[1]][order1[2]].seeds[order2[3]]
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
    for (let k = all ? 0 : order1.index + 1; k < state.seeds.length; k++) {
      let index1 = state.seeds[k].indexOf(p1)
      let index2 = state.seeds[k].indexOf(p2)
      switchSeeds(state, k, index1, index2, p1, p2)
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

function updateNextMatches (state, s, i, j, p1, p2) {
  console.log(i, j, p1, p2)
  if (i < state.seeds.length - 1) {
    let { i0, j0 } = getNextSeed(state, p1, s, i)
    if (p1 !== -1 && j0 !== -1) {
      const match0 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        if (match0.status === 'ready1') {
          match0.status = 'ready'
        } else if (match0.status === '' || match0.status === 'progress') {
          match0.status = 'ready2'
        }
      } else {
        if (match0.status === 'ready2') {
          match0.status = 'ready'
        } else if (match0.status === '' || match0.status === 'progress') {
          match0.status = 'ready1'
        }
      }
      if (state.scores[s][i0][Math.floor(j0 / 2)]) {
        state.scores[s][i0][Math.floor(j0 / 2)][2] = match0.status
        console.log(state.scores[s][i0][Math.floor(j0 / 2)])
      }
    }
    ({ i0, j0 } = getNextSeed(state, p2, s, i))
    if (p2 !== -1 && j0 !== -1) {
      const match1 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        if (match1.status === 'ready1') {
          match1.status = 'ready'
        } else if (match1.status === '' || match1.status === 'progress') {
          match1.status = 'ready2'
        }
      } else {
        if (match1.status === 'ready2') {
          match1.status = 'ready'
        } else if (match1.status === '' || match1.status === 'progress') {
          match1.status = 'ready1'
        }
      }
      if (state.scores[s][i0][Math.floor(j0 / 2)]) {
        state.scores[s][i0][Math.floor(j0 / 2)][2] = match1.status
      }
    }
  }
}

function updateNextCurves (state, s, i, j, p1, p2, isFinished) {
  if (i < state.seeds.length - 1) {
    let { i0, j0 } = getNextSeed(state, p1, s, i)
    if (p1 !== -1 && j0 !== -1) {
      const match0 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        updateCurve(match0.curves[1], state, p1, match0.order[0], match0.order[1], 1,
          { color: isFinished ? state.colors[p1] : null, shiftX: match0.curvesShiftX[1] })
      } else {
        updateCurve(match0.curves[0], state, p1, match0.order[0], match0.order[1], 0,
          { color: isFinished ? state.colors[p1] : null, shiftX: match0.curvesShiftX[0] })
      }
    }
    ({ i0, j0 } = getNextSeed(state, p2, s, i))
    if (p2 !== -1 && j0 !== -1) {
      const match1 = state.matches[s][i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        updateCurve(match1.curves[1], state, p2, match1.order[0], match1.order[1], 1,
          { color: isFinished ? state.colors[p2] : null, shiftX: match1.curvesShiftX[1] })
      } else {
        updateCurve(match1.curves[0], state, p2, match1.order[0], match1.order[1], 0,
          { color: isFinished ? state.colors[p2] : null, shiftX: match1.curvesShiftX[0] })
      }
    }
  }
}

function updateCurve (curv, state, p1, s, i, j, pos1, { color, shiftX }) {
  let { i0, j0 } = getPrevSeed(state, p1, s, i)
  const pos0 = (i0 === 0 && state.matches[s][i0][Math.floor(j0 / 2)].status === 'single') ? 0.5 : j0 % 2
  j0 = j0 % 2 ? j0 - 1 : j0
  curv.d = getCurve(
    state.mesh[s][i0][j0] + state.settings.matchWidth,
    state.mesh[s][i0][j0 + 1] + state.settings.matchHeight / 4 + pos0 * 30,
    state.mesh[s][i][j * 2] + 0,
    state.mesh[s][i][j * 2 + 1] + state.settings.matchHeight / 4 + pos1 * 30, shiftX)
  curv.color = color || state.settings.defaultCurveColor
  curv.dash = color ? 0 : 2
}

function createCurve (state, p1, s, i, j, pos1, { color, shiftX }) {
  let { i0, j0 } = getPrevSeed(state, p1, s, i)
  if (j0 === -1) {
    console.error('wrong order', p1, i, j)
    return null
  }
  // console.log(state.matches[s], i0, j0)
  const pos0 = (i0 === 0 && state.matches[s][i0][Math.floor(j0 / 2)].status === 'single') ? 0.5 : j0 % 2
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

function getCurve (x0, y0, x1, y1, shiftX) {
  const dx = (x1 - x0) * 0.755
  const dy = Math.abs(y1 - y0)
  const dx2 = dy > 200 ? Math.log(dy) * 15 : 0
  return 'M' + x0 + ',' + y0 + ' ' + 'C' + (x0 + dx + dx2 * 0.6 + shiftX * dx) + ',' + y0 + ' ' + (x1 - dx - dx2 + shiftX * dx) + ',' + y1 + ' ' + x1 + ',' + y1
}

function getRatingDelta (r1, r2, [s1, s2, status]) {
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

function getNextSeed (state, p1, s, i0) {
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

function getPrevSeed (state, p1, s, i0) {
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
