import { alwaysUpload } from '@/misc/constants'

const state = {
  // remember we restore state from localStorage, so these are defaults
  isFirstRun: true,
  whenToSync: alwaysUpload,
  isDetailedUserMode: false,
  addToHomeIosPromptLastDate: null,
  isEnablePhotoCompression: false,
}

const mutations = {
  setIsFirstRun: (state, value) => (state.isFirstRun = value),
  setWhenToSync: (state, value) => (state.whenToSync = value),
  setIsDetailedUserMode: (state, value) => (state.isDetailedUserMode = value),
  setAddToHomeIosPromptLastDate: (state, value) =>
    (state.addToHomeIosPromptLastDate = value),
  setEnablePhotoCompression: (state, value) =>
    (state.isEnablePhotoCompression = value),
}

const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export function callback(store) {
  store.watch(
    state => state.app.whenToSync,
    () => {
      console.debug('whenToSync value changed, triggering localQueueProcessing')
      store.dispatch('obs/processLocalQueue')
    },
  )
}
