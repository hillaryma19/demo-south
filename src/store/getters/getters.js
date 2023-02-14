const getters = {
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,

  showSettings: state => state.settings.showSettings,
  fixedHeader: state => state.settings.fixedHeader,
  sidebarLogo: state => state.settings.sidebarLogo,
}
export default getters