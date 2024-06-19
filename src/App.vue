<!-- @format -->

<template>

  <!-- <router-view v-slot="{ Component }">
    <transition name="ranimate">
      <component :is="Component" />
    </transition>
  </router-view> -->
  <router-view>

  </router-view>
</template>
<style scoped>
#app {
  width: 100%;
  height: 100%;
}

.ranimate-enter-active {
  animation: slideOutLeft 0.3s;
}

.ranimate-leave-active {
  animation: slideOutLeft 0.3s;
}
</style>