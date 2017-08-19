<template>
  <div id="app">
    <top-head></top-head>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
           <nav-menu></nav-menu>
        </nav>
        
        <main class="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
          <router-view></router-view>
        </main>

      </div>
    </div>
  </div>
</template>

<script>
import TopHead from './components/Head.vue'
import NavMenu from './components/NavMenu.vue'

export default {
  name: 'app',
  components: {
    TopHead,
    NavMenu
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

/*
 * Typography
 */

h1 {
  margin-bottom: 20px;
  padding-bottom: 9px;
  border-bottom: 1px solid #eee;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 51px;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  border-right: 1px solid #eee;
}

/* Sidebar navigation */
.sidebar {
  padding-left: 0;
  padding-right: 0;
}
</style>
