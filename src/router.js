import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import WowHeader from '@/pages/WowHeader'
import OauthCallback from '@/pages/OauthCallback'
import ObsDetail from '@/pages/obs-detail/index'
import Admin from '@/pages/Admin'
import NotFound from '@/pages/NotFound'
import SingleSpecies from '@/pages/new-obs/SingleSpecies'
import Onboarder from '@/pages/Onboarder'
import { mainStackReplace } from '@/misc/nav-stacks'

const uuidRegex =
  '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WowHeader,
    },
    {
      path: '/oauth-callback',
      name: 'OauthCallback',
      component: OauthCallback,
    },
    {
      path: `/obs/:id(\\d+|${uuidRegex})`,
      name: 'ObsDetail',
      component: ObsDetail,
      beforeEnter: resolveObsByIdOrNotFound,
    },
    {
      path: '/obs/:id(-?\\d+)/edit',
      name: 'ObsEdit',
      component: SingleSpecies,
      beforeEnter: resolveObsByIdOrNotFound,
      meta: {
        isEdit: true,
      },
    },
    {
      path: '/obs/new',
      name: 'ObsNewSingleSpecies',
      component: SingleSpecies,
      meta: {
        isEdit: false,
      },
    },
    // TODO use /obs/new-community for multiple species
    // TODO use /obs/new-mapping for mapping record
    {
      path: '/onboarder',
      name: 'Onboarder',
      component: Onboarder,
    },
    {
      path: '/zzadmin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '**', // catch all
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Reset pageStack to the new route
  const matchedComponents = to.matched.map(m => m.components.default)
  mainStackReplace(matchedComponents)
  next()
})

function resolveObsByIdOrNotFound(to, from, next) {
  const parsed = parseInt(to.params.id)
  const obsId = isNaN(parsed) ? to.params.id : parsed
  store.commit('obs/setSelectedObservationId', obsId)
  if (!store.getters['obs/observationDetail']) {
    return next({ name: 'NotFound', replace: true })
  }
  return next()
}

export default router
