<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link :to="{ name: 'home' }" class="navbar-brand">主页</router-link>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'login' }" class="nav-link">登录</router-link>            
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" @click="onLogout">注销</b-link>
                </li>
            </ul>
            <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'head',
    data () {
        return {
        }
    },
    methods: {
        onLogout (evt) {
            this.$store.commit('logout')
            this.$router.push('/login')
        }
    }
}
</script>

