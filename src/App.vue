<template>
    <MapWindow/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  MapWindow  from './pages/MapWindow.vue'
export default defineComponent({
  name: 'App',
  components: {
    MapWindow
  }
});
</script>

<style lang="scss">
@import './styles/styles.scss';
</style>
