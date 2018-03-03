<template>
    <div id="app" class="app-main">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
.app-main {
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
