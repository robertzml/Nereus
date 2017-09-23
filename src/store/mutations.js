export default {
    LOGIN: (state, userInfo) => {
        state.user = userInfo
    },

    LOGOUT: (state) => {
        state.user.login = false
        state.user.id = ''
        state.user.name = ''
        state.user.roleId = ''
        state.user.companyId = ''
    }
}
