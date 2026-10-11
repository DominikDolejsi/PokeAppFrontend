<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="css">
.slide-down-enter-active,
.slide-down-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition:
    transform 0.5s ease,
    opacity 1s ease;
}

.slide-down-enter-from {
  transform: translateY(-100vh);
}

.slide-down-enter-to {
  transform: translateY(0);
}

.slide-down-leave-from {
  opacity: 1;
}

.slide-down-leave-to {
  opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition:
    transform 0.5s ease,
    opacity 1s ease;
}

.slide-up-enter-from {
  opacity: 1;
}

.slide-up-enter-to {
  opacity: 1;
}

.slide-up-leave-from {
  transform: translateX(0);
}

.slide-up-leave-to {
  transform: translateX(-100vw);
}
</style>
