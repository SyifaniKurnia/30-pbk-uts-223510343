<template>
  <div>
    <nav class="navbar" x-data>
      <a href="#" class="navbar-logo"><span>Syifani_343</span></a>

      <div class="navbar-links">
        <router-link to="/" class="navbar-link">Todo</router-link>
        <router-link to="/post" class="navbar-link">Post</router-link>
        <router-link to="/album" class="navbar-link">Album</router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 7%;
  background-color: #003c43;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.navbar .navbar-logo {
  font-size: 2rem;
  color: #fff;
}

.navbar .navbar-logo span {
  color: #fff;
  font-weight: bold;
}

.navbar .navbar-links {
  display: flex;
  align-items: center;
}

.navbar .navbar-link {
  padding: 5px 15px;
  color: #003c43;
  font-size: 1.3rem;
  font-weight: 800;
  margin-left: 3rem;
  transition: text-decoration 0.3s ease;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: aliceblue;
}

.navbar .navbar-link:hover {
  text-decoration: underline;
}
</style>
