import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const settingsModule = {
  state: {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    tagsView: tagsView,
    sidebarLogo: sidebarLogo
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}

export default settingsModule
