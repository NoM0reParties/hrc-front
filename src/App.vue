<template>
  <nav>
    <router-link to="/">Фичи</router-link> |
    <router-link to="/teams">Команды</router-link> |
    <router-link to="/dev-teams">Загруженность команд</router-link>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  position: relative;
  max-width: 85vw;
  margin: 0 7.5vw;
}

.dp__input {
  border-radius: 10px !important;
  height: 50px;
}

.center__it {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
