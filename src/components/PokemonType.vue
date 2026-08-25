<script setup lang="ts">
import { computed } from "vue";
import { TYPE_ICONS_URL } from "../constants";

const { type } = defineProps<{ type: string }>();

// I have to define what type of icon will go
// and then I have to decide typing of the icon
// Need own typing for pokemonType and iconVersion
const getIconName = (pokemonType: string, iconVersion: string): string => {
    return `${TYPE_ICONS_URL}/${pokemonType}_${iconVersion}.png`;
};

const iconAlt = computed(() => `Icon of ${type} type pokemon`);
</script>

<template>
    <div>
        <img :src="getIconName(type, 'go')" :alt="iconAlt" />
    </div>
</template>

<style lang="css" scoped></style>
