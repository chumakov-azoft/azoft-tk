import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import git from './plugins/git'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    zoom: null,
    settings: {
      base: '',
      role: localStorage['role'] || '',
      defaultCurveColor: '#cccccc',
      defaultChevronColor: '#dddddd',
      showLogo: true,
      matchWidth: 220,
      matchHeight: 60,
      maxScore: 3
    },
    edit: {
      itemToSwitch: null,
      itemsToMove: [],
      current: { index: 0, count: 0, p: 0, name: '' }
    },
    colors: ['#ff0500', '#0074d9', '#01ff70', '#fff100', '#c200ff', '#00f9ff', '#ff8c00', '#ff00bc', '#003f83', '#B50002', '#019e47', '#a7a400', '#7b009d', '#00969b', '#773b00', '#990063', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd', '#7fdbff', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd', '#7fdbff', '#0074d9', '#01ff70', '#001f3f', '#39cccc', '#3d9970', '#2ecc40', '#ff4136', '#85144b', '#ff851b', '#b10dc9', '#ffdc00', '#f012be', '#aaaaaa', '#dddddd'],
    // players: JSON.parse('[{"name":"Казачев Станислав Александрович","location":"Самарская обл., Чапаевск","rating":"638.73"},{"name":"Токарев Александр Алексеевич","location":"Самарская обл., Самара","rating":"667.28"},{"name":"Божко Данила Николаевич","location":"Самара","rating":"572.14"},{"name":"Стешин Михаил Алексеевич","location":"Самарская обл., Самара","rating":"687.74"},{"name":"Бахметьев Валерий Николаевич","location":"Самарская обл., Самара","rating":"655.51"},{"name":"Бурачек Владимир Николаевич","location":"Самарская обл., Кинель","rating":"615.49"},{"name":"Прохоров Александр Николаевич","location":"Самарская обл., Самара","rating":"631.18"},{"name":"Усманов Александр Владимирович","location":"Самарская обл., Самара","rating":"616.32"},{"name":"Ельшов Максим Викторович","location":"Самарская обл., Самара","rating":"629.55"},{"name":"Клушин Анатолий Федорович","location":"Самарская обл., Самара","rating":"560.99"},{"name":"Хуснутдинов Ерлан Георгиевич","location":"Самарская обл., Самара","rating":"627.76"},{"name":"Петров Антон Владимирович","location":"Самарская обл., Самара","rating":"639.99"},{"name":"Коба Александр Владимирович","location":"Самарская обл., Самара","rating":"633.81"},{"name":"Емельянов Андрей Николаевич","location":"Самарская обл., Самара","rating":"599.38"},{"name":"Гурков Дмитрий Анатольевич","location":"Самарская обл., Самара","rating":"585.37"},{"name":"Арапов Александр Алексеевич","location":"Самарская обл., Самара","rating":"584.96"},{"name":"Гусев Андрей Николаевич","location":"Самарская обл., Самара","rating":"543.26"},{"name":"Кузнецов Кирилл Дмитриевич","location":"Самарская обл., Самара","rating":"429.03"},{"name":"Засорёнков Сергей Владимирович","location":"Самарская обл., Самара","rating":"594.59"},{"name":"Леонтьев Алексей Александрович","location":"Самарская обл., Самара","rating":"563.92"},{"name":"Вирюжский Николай Викторович","location":"Самарская обл., Самара","rating":"492.80"},{"name":"Борщевский Юрий Давидович","location":"Самарская обл., Самара","rating":"589.45"},{"name":"Федяев Антон Вадимович","location":"Самарская обл., Самара","rating":"446.67"},{"name":"Ширяев Михаил Викторович","location":"Самарская обл., Самара","rating":"508.35"},{"name":"Гафиатулин Чингиз Тагирович","location":"Самарская обл., Самара","rating":"607.46"},{"name":"Солдаткин Дмитрий Викторович","location":"Самарская обл., Самара","rating":"591.42"},{"name":"Федин Дмитрий Игоревич","location":"Самарская обл., Самара","rating":"437.04"},{"name":"Кравченко Денис Константинов","location":"Самарская обл., Самара","rating":"353.33"},{"name":"Кукорин Марат Алексеевич","location":"Самарская обл., Самара","rating":"515.36"},{"name":"Король Михаил Анатольевич","location":"Самарская обл., Самара","rating":"548.40"},{"name":"Гуленков Олег Витальевич","location":"Самарская обл., Самара","rating":"446.42"},{"name":"Лучкин Вадим Игоревич","location":"Самарская обл., Самара","rating":"558.64"}]'),
    // players: JSON.parse('[{"name":"Добренький Артём Николаевич","location":"Крым, Ялта","rating":"690.48"},{"name":"Чекалов Дмитрий Геннадьевич","location":"Крым, Ялта","rating":"471.74"},{"name":"Груздов Дарион Сергеевич","location":"Крым, Ялта","rating":"481.34"},{"name":"Невский Александр Александрович","location":"Крым, Ялта","rating":"504.61"},{"name":"Широких Тимур Иванович","location":"Крым, Севастополь","rating":"489.13"},{"name":"Груздов Даниэль Сергеевич","location":"Крым, Ялта","rating":"410.87"},{"name":"Ирижепов Сергей Булатович","location":"Екатеринбург","rating":"407.31"},{"name":"Гладунов Александр Витальевич","location":"Крым, Ялта","rating":"376.21"},{"name":"Груздов Сергей Николаевич","location":"Крым, Ялта","rating":"425.73"},{"name":"Калугин Артём Олегович","location":"Крым, Алушта","rating":"223.68"},{"name":"Пичугов Сергей Леонидович","location":"Крым, Алушта","rating":"220.57"},{"name":"Корзанов Михаил Владимирович","location":"Крым, Ялта","rating":"364.81"},{"name":"Марченко Андрей Иванович","location":"Крым, Орлиное","rating":"352.11"},{"name":"Коваль Николай Александрович","location":"Крым, Симферополь","rating":"257.75"},{"name":"Ланье Владимир Георгиевич","location":"Крым, Ялта","rating":"179.72"},{"name":"Атутова Наталья Антоновна","location":"Бурятия, Улан-Удэ","rating":"120.02"}]'),
    // JSON.parse('[{"name":"Юдин Валерий Витальевич","location":"Новосибирская обл., Новосибирск","rating":"511.41"},{"name":"Солдатов Евгений Анатольевич","location":"Новосибирская обл., Новосибирск","rating":"457.05"},{"name":"Ефременко Всеволод Даниилович","location":"Новосибирская обл., Новосибирск","rating":"490.23"},{"name":"Насыбуллов Тимур Ринатович","location":"Новосибирская обл., Новосибирск","rating":"384.38"},{"name":"Колодный Денис Владимирович","location":"Новосибирская обл., Новосибирск","rating":"461.80"},{"name":"Жаринов Алексей Сергеевич","location":"Новосибирская обл., Новосибирск","rating":"329.63"},{"name":"Шинкевич Сергей Анатольевич","location":"Новосибирская обл., Бердск","rating":"416.29"},{"name":"Паньшин Виктор Владимирович","location":"Новосибирская обл, Новосибирск","rating":"399.07"},{"name":"Лущинский Александр Владимирович","location":"Новосибирская обл., Бердск","rating":"290.69"},{"name":"Васильев Алексей Сергеевич","location":"Новосибирская обл., Новосибирск","rating":"302.01"},{"name":"Наумов Дмитрий Николаевич","location":"Новосибирская обл., Новосибирск","rating":"204.96"},{"name":"Свиридов Евгений Юрьевич","location":"Новосибирская обл., Новосибирск","rating":"208.49"},{"name":"Ковалева Екатерина Александровна","location":"Новосибирская обл., Новосибирск","rating":"150.51"},{"name":"Рудых Ярослав Игоревич","location":"Новосибирская обл., Новосибирск","rating":"131.57"},{"name":"Михеев Юрий Викторович","location":"Новосибирская обл., Новосибирск","rating":"126.50"}]'),
    players: [],
    matches: null,
    positions: [],
    curves: [],
    orders: [],
    mesh: []
  },
  mutations: {
    initialize (state, section) {
      if (section) {
        const host = window.location.hostname.indexOf('localhost') !== -1 ? 'https://azoft.tk/' : ''
        // const host = window.location.hostname.indexOf('localhost') === -1 ? 'https://raw.githubusercontent.com/chumakov-azoft/azoft-tk/master/' : ''
        state.settings.base = 'events/' + section + '/'
        const rand = Math.random()
        Promise.all([
          axios.get(host + state.settings.base + 'index.json?v=' + rand),
          axios.get(host + state.settings.base + 'players.json?v=' + rand),
          axios.get(host + state.settings.base + 'mesh.json?v=' + rand),
          axios.get(host + state.settings.base + 'orders.json?v=' + rand),
          axios.get(host + state.settings.base + 'scores.json?v=' + rand)
        ]).then((values) => {
          console.log(values, values[0].data.name)
          document.title = values[0].data.name
          state.players = values[1].data.players
          state.mesh = values[2].data.mesh
          state.orders = values[3].data.orders
          state.scores = values[4].data.scores
          try {
            preparePlayers(state)
            createMatches(state)
          } catch (e) {
            console.log(e)
          }
        }).catch(e => {
          console.error(e)
          router.replace('/')
        })
      }
      // preparePlayers(state, [0, 2, 1, 4, 7, 6, 5, 3, 10, 11, 9, 8, -1, 14, 13, 12])
      // createMatches(state)
    },
    over (state, { order, $event }) {
      overHalf(state, { order, $event })
    },
    out (state, { order, $event }) {
      outHalf(state, { order, $event })
    },
    click (state, { order, $event }) {
      console.log(order)
      if ($event.ctrlKey || $event.altKey) {
        if (!state.edit.itemToSwitch) {
          state.edit.itemToSwitch = { ...order }
        } else {
          outHalf(state, {})
          switchOrder(state, state.edit.itemToSwitch, order, !$event.altKey)
          state.edit.itemToSwitch = null
          overHalf(state, { order })
        }
      } else if ($event.shiftKey) {
        state.edit.itemsToMove.push(state.matches[order.index][order.count])
      } else {
        // console.log(state.matches[order.index][order.count].names[order.p])
        if (order.index === 0 && state.matches[order.index][order.count].names[order.p].indexOf('Запgiисывайтесь') !== -1) {
          document.location.href = 'tg://t.me/joinchat/FMaTykiB1RIoc7PMD5RTkQ'
        }
        state.edit.itemsToMove = [state.matches[order.index][order.count]]
      }
    },
    setMatchScore (state, { index: i, count: j, p, score }) {
      state.scores[i][j][p] = score
      Vue.set(state.matches[i][j].scores, p, score)
      localStorage['scores'] = JSON.stringify(state.scores)
      localStorage['orders'] = JSON.stringify(state.orders)
      console.log(JSON.stringify(state.scores).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
      console.log(JSON.stringify(state.orders).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
    },
    setMatchWinner (state, { index: i, count: j, p }) {
      const match = state.matches[i][j]
      const statusOld = match.status
      const statusNew = p ? 'win2' : 'win1'
      match.status = statusNew
      state.scores[i][j][2] = statusNew
      let [p1, p2] = match.seeds
      if (i + 1 < state.orders.length && ((statusOld === 'win2' && statusNew === 'win1') || (statusOld !== 'win2' && statusNew === 'win2'))) {
        for (let k = i + 1; k < state.orders.length; k++) {
          let index1 = state.orders[k].indexOf(p1)
          let index2 = state.orders[k].indexOf(p2)
          switchSeeds(state, k, index1, index2, p1, p2)
        }
      }
      updateNextMatches(state, i, j, p1, p2)
      updateNextCurves(state, i, j, p1, p2, true)
    }
  },
  actions: {
    setMatchResult ({ state, commit }, key) {
      const index = state.edit.current.index
      const count = state.edit.current.count
      const p = state.edit.current.p
      if (state.matches[index][count].status === 'single' || state.matches[index][count].status === 'ready1' || state.matches[index][count].status === 'ready2') {
        return
      }
      outHalf(state, {})
      if (!state.edit.current.next) {
        commit('setMatchScore', { index, count, p, score: key })
        state.edit.current.next = true
        if (key >= state.settings.maxScore || key === 'Tex') {
          commit('setMatchWinner', { index, count, p })
          commit('setMatchScore', { index, count, p: 1 - p, score: 0 })
        } else {
          commit('setMatchWinner', { index, count, p: 1 - p })
          commit('setMatchScore', { index, count, p: 1 - p, score: state.settings.maxScore })
        }
      } else {
        commit('setMatchScore', { index, count, p: 1 - p, score: key })
        state.edit.current.next = null
        if (key >= state.settings.maxScore && ['win1', 'win2'].indexOf(state.matches[index][count].status) === -1) {
          commit('setMatchWinner', { index, count, p })
        }
      }
      setTimeout(() => overHalf(state, { order: { index, count, p } }))
    },
    moveMatches ({ state, commit }, { dx, dy }) {
      state.edit.itemsToMove.forEach((match) => {
        const [i, j] = match.order
        const [p1, p2] = match.seeds
        match.position = [state.mesh[i][j * 2] = match.position[0] + dx, state.mesh[i][j * 2 + 1] = match.position[1] + dy]
        let isFinished = match.status === 'win1' || match.status === 'win2'
        let isReady = match.status === 'win1' || match.status === 'win2' || match.status === 'ready'
        if (match.curves) {
          updateCurve(match.curves[0], state, p1, match.order[0], match.order[1], 0,
            { color: isReady || match.status === 'ready1' ? state.colors[p1] : null, shiftX: match.curvesShiftX[0] })
          updateCurve(match.curves[1], state, p2, match.order[0], match.order[1], 1,
            { color: isReady || match.status === 'ready2' ? state.colors[p2] : null, shiftX: match.curvesShiftX[1] })
        }
        updateNextCurves(state, i, j, p1, p2, isFinished)
      })
      console.log('------')
      let meshOut = ''
      state.mesh.forEach((meshArr) => {
        meshOut += '[' + meshArr.join(', ') + '],\n'
      })
      console.log(meshOut.slice(0, -2) + '\n')
    },
    saveResults ({ state, commit }) {
      git.saveState(state.settings.base, ['orders.json', 'scores.json'], [
        JSON.stringify({ orders: state.orders }).replace('[[', '[\n[').replace(/\],\[/gm, '],\n['),
        JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n[') + '}'
      ])
    },
    saveFiles ({ state, commit }) {
      git.saveFile('orders.json', JSON.stringify({ orders: state.orders }).replace('[[', '[\n[').replace(/\],\[/gm, '],\n['))
      git.saveFile('scores.json', JSON.stringify({ scores: state.scores }).replace('[[[', '[\n[[').replace(/\]\],\[/gm, ']],\n['))
    },
    restoreFromStorage ({ state, commit }) {
      state.orders = JSON.parse(localStorage['orders'])
      state.scores = JSON.parse(localStorage['scores'])
      createMatches(state)
    },
    savePlayers ({ state, commit }) {
      // git.saveState(state.settings.base, ['players.json'], { players: state.players })
    }
  }
})

function preparePlayers (state, seedArr) {
  const nameSet = new Set()
  state.players.map((player) => {
    player.currentRating = +player.rating
    const names = player.name.split(' ')
    player.short = names[0]
    if (names.length > 1) {
      player.short += ' ' + names[1].substr(0, 1) + '.'
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
      state.orders = state.orders.map((order) => (order.map((p) => (p < 0 ? p : seedArr[p]))))

      console.log('------', state.orders)
      let ordersOut = ''
      state.orders.forEach((ordersArr) => {
        ordersOut += '[' + ordersArr.join(', ') + '],\n'
      })
      console.log(ordersOut.slice(0, -2) + '\n')
    }
    // state.players.forEach((player) => { console.log(player.short, player.rating) })
  }
}

function createMatches (state) {
  state.curves = []
  state.matches = []
  state.positions = []// localStorage['positions'] ? JSON.parse(localStorage['positions']) : []
  for (let i = 0; i < state.orders.length; i++) {
    let round = []
    let order = state.orders[i]
    if (!state.scores[i]) {
      state.scores[i] = []
    }
    const len = order.length / 2
    for (let j = 0; j < len; j += 1) {
      let p1 = order[j * 2]
      let p2 = order[j * 2 + 1]
      if (p1 < 0 || p2 < 0) {
        if (i === 0 && p1 >= 0) {
          round.push({
            order: [i, j],
            seeds: [p1, -1],
            logos: [state.players[p1].logo || ''],
            names: [state.players[p1].short],
            position: [state.mesh[i][j * 2], state.mesh[i][j * 2 + 1]],
            ratings: [Math.round(state.players[p1].rating)],
            scores: [''],
            status: 'single'
          })
        } else if (i === 0 && p2 >= 0) {
          round.push({
            order: [i, j],
            seeds: [p2, -1],
            logos: [state.players[p2].logo || ''],
            names: [state.players[p2].short],
            position: [state.mesh[i][j * 2], state.mesh[i][j * 2 + 1]],
            ratings: [Math.round(state.players[p2].rating)],
            scores: [''],
            status: 'single'
          })
        } else {
          round.push(null)
        }
        continue
      }
      let status = i === 0 ? 'ready' : ''
      // let status = state.players[p1].rating >= state.players[p2].rating ? 'win1' : 'win2'
      // let status = 'win1'
      if (!state.scores[i][j]) {
        state.scores[i][j] = [0, 0, status]
      } else {
        status = state.scores[i][j][2]
        // state.scores[i][j] = status === 'win1' ? [3, 0, status] : [0, 3, status]
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
          console.log('stat', status, isReady, state.scores[i], colors)
        }
        curves = [
          createCurve(state, p1, i, j, 0, { color: colors[0], shiftX: curvesShiftX[0] }),
          createCurve(state, p2, i, j, 1, { color: colors[1], shiftX: curvesShiftX[1] })
        ]
        if (curves[0]) {
          state.curves.push(curves[0])
        }
        if (curves[1]) {
          state.curves.push(curves[1])
        }
      }
      if (state.players.length <= p1) {
        removeSeed(state, p1)
        continue
      }
      if (state.players.length <= p2) {
        removeSeed(state, p2)
        continue
      }
      round.push({
        order: [i, j],
        seeds: [p1, p2],
        curves: curves,
        curvesShiftX: curvesShiftX,
        logos: [state.players[p1].logo || '', state.players[p2].logo || ''],
        names: [state.players[p1].short, state.players[p2].short],
        position: [state.mesh[i][j * 2], state.mesh[i][j * 2 + 1]],
        ratings: [Math.round(state.players[p1].currentRating), Math.round(state.players[p2].currentRating)],
        scores: state.scores[i][j],
        status: status
      })
      if (status === 'win1' || status === 'win2') {
        const delta = getRatingDelta(+state.players[p1].rating, +state.players[p2].rating, state.scores[i][j])
        state.players[p1].currentRating += status === 'win1' ? delta[0] : delta[1]
        state.players[p2].currentRating += status === 'win1' ? delta[1] : delta[0]
        if (i === 0) {
          console.log(j, +state.players[p1].currentRating, +state.players[p2].currentRating, state.scores[i][j], delta)
        }
      }
    }
    state.matches.push(round)
  }
  // console.log(matches)
}

function overHalf (state, { order, $event }) {
  console.log('i=' + order.index, 'j=' + order.count, 'seeds:', state.matches[order.index][order.count].seeds.join(','), 'status:', state.matches[order.index][order.count].status, 'position:', state.matches[order.index][order.count].position.join(','), state.scores[order.index][order.count].join(','))
  if ($event && (order.index !== state.edit.current.index || order.count !== state.edit.current.count || order.p !== state.edit.current.p)) {
    state.edit.current = order
  }
  document.querySelectorAll('#player' + state.matches[order.index][order.count].seeds[order.p] + ':not(.empty)').forEach((element) => element.classList.add('over'))
}

function outHalf (state, { order, $event }) {
  if ($event && state.edit.current) {
    state.edit.current.next = null
  }
  document.querySelectorAll('#player' + state.matches[state.edit.current.index][state.edit.current.count].seeds[state.edit.current.p]).forEach((element) => element.classList.remove('over'))
}

function switchSeeds (state, i, index1, index2, p1, p2) {
  if (index1 !== -1) {
    state.orders[i][index1] = p2
    setMatchSeed(state, i, index1, p2)
  }
  if (index2 !== -1) {
    state.orders[i][index2] = p1
    setMatchSeed(state, i, index2, p1)
  }
}

function setMatchSeed (state, i, j, p) {
  if (!state.matches) {
    return
  }
  const match = state.matches[i][Math.floor(j / 2)]
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
      updateCurve(match.curves[1], state, p, match.order[0], match.order[1], 1,
        { color: isFinished ? state.colors[p] : null, shiftX: match.curvesShiftX[1] })
    }
  } else {
    match.seeds[0] = p
    match.logos[0] = state.players[p].logo
    match.names[0] = state.players[p].short
    match.ratings[0] = Math.round(state.players[p].rating)
    if (match.curves) {
      updateCurve(match.curves[0], state, p, match.order[0], match.order[1], 0,
        { color: isFinished ? state.colors[p] : null, shiftX: match.curvesShiftX[0] })
    }
  }
}

function removeSeed (state, p) {
  let i = 0
  while (i < state.orders.length) {
    let j = state.orders[i].indexOf(p)
    if (j !== -1) {
      if (j % 2) {
        state.orders[i][j] = -1
        if (i > 0) {
          state.orders[i][j - 1] = -1
        }
      } else {
        let p2 = state.orders[i][j + 1]
        for (let k = i + 1; k < state.orders.length; k++) {
          let index1 = state.orders[k].indexOf(p)
          let index2 = state.orders[k].indexOf(p2)
          switchSeeds(state, k, index1, index2, p, p2)
        }
        state.orders[i][j] = -1
        if (i > 0) {
          state.orders[i][j + 1] = -1
        }
      }
    }
    i++
  }
}

const globalOrdering = false
function switchOrder (state, order1, order2, all = true) {
  let p1 = state.matches[order1.index][order1.count].seeds[order1.p]
  let p2 = state.matches[order2.index][order2.count].seeds[order2.p]
  // const arr = idealDE16
  if (globalOrdering) {
    for (let i = order1.index; i < idealDE16.length; i++) {
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
    createMatches(state)
  } else {
    for (let k = all ? 0 : order1.index + 1; k < state.orders.length; k++) {
      let index1 = state.orders[k].indexOf(p1)
      let index2 = state.orders[k].indexOf(p2)
      switchSeeds(state, k, index1, index2, p1, p2)
    }
    localStorage['orders'] = JSON.stringify(state.orders)
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

function updateNextMatches (state, i, j, p1, p2) {
  console.log(i, j, p1, p2)
  if (i < state.orders.length - 1) {
    let { i0, j0 } = getNextSeed(state, p1, i)
    if (p1 !== -1 && j0 !== -1) {
      const match0 = state.matches[i0][Math.floor(j0 / 2)]

      console.log(1111, i0, j0, p1, p2)
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
      if (state.scores[i0][Math.floor(j0 / 2)]) {
        state.scores[i0][Math.floor(j0 / 2)][2] = match0.status
        console.log(state.scores[i0][Math.floor(j0 / 2)])
      }
    }
    ({ i0, j0 } = getNextSeed(state, p2, i))
    if (p2 !== -1 && j0 !== -1) {
      const match1 = state.matches[i0][Math.floor(j0 / 2)]
      console.log(22222, i0, j0, p1, p2)
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
      if (state.scores[i0][Math.floor(j0 / 2)]) {
        state.scores[i0][Math.floor(j0 / 2)][2] = match1.status
      }
    }
  }
}

function updateNextCurves (state, i, j, p1, p2, isFinished) {
  if (i < state.orders.length - 1) {
    let { i0, j0 } = getNextSeed(state, p1, i)
    if (p1 !== -1 && j0 !== -1) {
      const match0 = state.matches[i0][Math.floor(j0 / 2)]
      if (j0 % 2) {
        updateCurve(match0.curves[1], state, p1, match0.order[0], match0.order[1], 1,
          { color: isFinished ? state.colors[p1] : null, shiftX: match0.curvesShiftX[1] })
      } else {
        updateCurve(match0.curves[0], state, p1, match0.order[0], match0.order[1], 0,
          { color: isFinished ? state.colors[p1] : null, shiftX: match0.curvesShiftX[0] })
      }
    }
    ({ i0, j0 } = getNextSeed(state, p2, i))
    if (p2 !== -1 && j0 !== -1) {
      const match1 = state.matches[i0][Math.floor(j0 / 2)]
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

function updateCurve (curv, state, p1, i, j, pos1, { color, shiftX }) {
  console.log(p1, i, j, pos1, color, shiftX)
  let { i0, j0 } = getPrevSeed(state, p1, i)
  const pos0 = (i0 === 0 && state.matches[i0][Math.floor(j0 / 2)].status === 'single') ? 0.5 : j0 % 2
  j0 = j0 % 2 ? j0 - 1 : j0
  curv.d = getCurve(
    state.mesh[i0][j0] + state.settings.matchWidth,
    state.mesh[i0][j0 + 1] + state.settings.matchHeight / 4 + pos0 * 30,
    state.mesh[i][j * 2] + 0,
    state.mesh[i][j * 2 + 1] + state.settings.matchHeight / 4 + pos1 * 30, shiftX)
  curv.color = color || state.settings.defaultCurveColor
  curv.dash = color ? 0 : 2
}

function createCurve (state, p1, i, j, pos1, { color, shiftX }) {
  let { i0, j0 } = getPrevSeed(state, p1, i)
  if (j0 === -1) {
    console.error('wrong order', p1, i, j)
    return null
  }
  const pos0 = (i0 === 0 && state.matches[i0][Math.floor(j0 / 2)].status === 'single') ? 0.5 : j0 % 2
  j0 = j0 % 2 ? j0 - 1 : j0
  return {
    d: getCurve(
      state.mesh[i0][j0] + state.settings.matchWidth,
      state.mesh[i0][j0 + 1] + (state.settings.matchHeight / 4 + pos0 * 30),
      state.mesh[i][j * 2] + 0,
      state.mesh[i][j * 2 + 1] + state.settings.matchHeight / 4 + pos1 * 30, shiftX),
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

function getNextSeed (state, p1, i0) {
  let j0 = -1
  while (i0 < state.orders.length - 1) {
    i0++
    j0 = state.orders[i0].indexOf(p1)
    if (j0 !== -1) {
      return { i0, j0 }
    }
  }
  return { i0, j0 }
}

function getPrevSeed (state, p1, i0) {
  let j0 = -1
  while (i0 > 0) {
    i0--
    j0 = state.orders[i0].indexOf(p1)
    if (j0 !== -1) {
      return { i0, j0 }
    }
  }
  return { i0, j0 }
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
