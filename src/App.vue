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
    transform 2s ease,
    opacity 2s ease;
}

.slide-down-enter-from {
  transform: translateY(-100vh);
  opacity: 0;
}

.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-to {
  transform: translateY(0);
  opacity: 0;
}
</style>
