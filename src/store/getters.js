/* getters.js */

export default {
    isLogin: state => {
        console.log('login getter')
        console.log(state.user)
        return state.user.login
    }
}
