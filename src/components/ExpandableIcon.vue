<script setup lang="ts">
import { ref } from "vue";
import { PokemonType } from "../types";

const {
  backgroundColor,
  iconAlt,
  iconBackgroundColor,
  iconSrc,
  iconText,
  direction,
} = defineProps<{
  iconSrc: string;
  iconAlt: string;
  iconText: string | PokemonType;
  iconBackgroundColor: string | null;
  backgroundColor: string;
  direction: "left" | "right";
}>();

const expanded = ref(false);
let expandedId = 0;

const expand = () => {
  const id = Math.random();
  expandedId = id;
  expanded.value = !expanded.value;
  if (expanded.value) {
    setTimeout(() => {
      if (expanded.value && id === expandedId) {
        expanded.value = false;
      }
    }, 2000);
  }
};
</script>

<template>
  <div class="container">
    <div
      @click="expand()"
      class="background"
      :class="{ expanded }"
      :style="{
        background: backgroundColor,
        '--expanded-width': `${iconText.length}ch`,
      }"
    >
      <img
        class="icon"
        :src="iconSrc"
        :alt="iconAlt"
        :class="{ expanded }"
        :style="{
          background: iconBackgroundColor ?? 'rgba(0, 0, 0, 0)',
          justifySelf: direction === 'right' ? 'start' : 'end',
        }"
      />
      <p
        class="typeName"
        :class="{ expanded }"
        :style="{ justifySelf: direction === 'right' ? 'end' : 'start' }"
      >
        {{ iconText }}
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: grid;
  user-select: none;
}

.background {
  display: grid;
  width: 68px;
  height: 68px;
  border-radius: 68px;
  transition: width 0.5s ease;
  transition-delay: 0.25s;
  overflow: clip;
}

.background.expanded {
  width: calc(64px + calc(var(--expanded-width) * 1.25) + 1rem);
  transition-delay: 0s;
}

.typeName {
  align-self: center;
  font-size: 1.25rem;
  color: black;
  transition: opacity 0.25s ease-in;
  opacity: 0;
  margin-inline: 1rem;
}

.typeName.expanded {
  opacity: 1;
  transition-delay: 0.25s;
}

.icon {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  margin: 2px;
}
</style>
