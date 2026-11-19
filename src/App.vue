<script setup>
import { useRoute } from 'vue-router'
import BackToHome from './components/BackToHome.vue'

const route = useRoute()
</script>

<template>
  <RouterView />
  <BackToHome v-if="route.name && route.name !== 'home'" />
</template>
