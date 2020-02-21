import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/l',
      beforeEnter () {
        location.href.indexOf('localhost') === -1
          ? location.href = 'https://github.com/login/oauth/authorize?scope=repo&client_id=bf870e3b39e7567fedf6&redirect_uri=http://academtour.github.io/#/settings'
          : location.href = 'https://github.com/login/oauth/authorize?scope=repo&client_id=574751fedca734e7f208&redirect_uri=http://localhost:8080/#/settings'
      }
    },
    {
      path: '/',
      name: 'about',
      component: About
    },
    {
      path: '/now',
      redirect: '/events/open-2'
    },
    {
      path: '/events/:section/:media?/:score?',
      name: 'home',
      component: Home,
      props: true,
      meta: {
        title: ''
      }
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {},
      beforeEnter (to, from, next) {
        if (location.href.indexOf('?code=') !== -1) {
          const codeStart = location.href.indexOf('?code=')
          const codeEnd = location.href.indexOf('/', codeStart)
          const code = location.href.substring(codeStart + 6, codeEnd - 1)
          const clientId = location.href.indexOf('localhost') !== -1 ? '574751fedca734e7f208' : 'bf870e3b39e7567fedf6'
          const clientSecret = location.href.indexOf('localhost') !== -1 ? '7b87fc1f1b8b5db41cdf9f9d2849184944bdaae6' : 'cc1ab401631b982dc63088f131f688e7365b2067'
          window.history.replaceState({}, document.title, '/#/settings')
          axios.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token' +
            '?client_id=' + clientId +
            '&client_secret=' + clientSecret +
            '&code=' + code,
          null, { headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          } }
          ).then(response => {
            localStorage.githubToken = response.data.access_token
          }).catch(response => {
            console.error(response)
          })
        }
        next()
      },
      component: null
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // console.log(from, to, to.params.section)
  if (to.path === '/admin') {
    localStorage['role'] = 'admin'
    next({ path: '/' })
  } else if (from.params['section'] && to.params['section'] !== from.params['section']) {
    next()
    location.reload()
  } else if (to.path.indexOf('/events') === 0) {
    next()
  } else if (to.path === '/') {
    next()
  } else {
    next('/')
  }
})
export default router
