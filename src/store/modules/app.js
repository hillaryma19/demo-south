import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/storage.js'
const appModule = {
  state: {
    sidebar: {
      opened: getLocalStorage('SIDE_BAR_STATUS') ? !!+getLocalStorage('SIDE_BAR_STATUS') : true,
      withoutAnimation: false
    },
    device: 'desktop',
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
      if (state.sidebar.opened) {
        removeLocalStorage('SIDE_BAR_STATUS');
        setLocalStorage('SIDE_BAR_STATUS', 1);
      } else {
        setLocalStorage('SIDE_BAR_STATUS', 0);
      }
    },
    CLOSE_SIDEBAR: state => {
      removeLocalStorage('SIDE_BAR_STATUS');
      setLocalStorage('SIDE_BAR_STATUS', 0);
      state.sidebar.opened = false;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
  },
  actions: {
    handleToggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSidebar({ commit }) {
      commit('CLOSE_SIDEBAR');
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
  },
}
export default appModule