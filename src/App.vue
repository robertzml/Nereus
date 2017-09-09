<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    created () {
        this.checkLogin()
    },
    methods: {
        checkLogin () {
            if (this.$store.state.userInfo.login) {
                this.$router.push('/')
            } else {
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/

/* Move down content because we have a fixed navbar that is 3.5rem tall */
body {
    padding-top: 3.5rem;
}
</style>
