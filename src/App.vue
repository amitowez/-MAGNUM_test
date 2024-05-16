<template>
    <GlobalLoader v-if="!MapStore.showMap" />
    <MapWindow v-else />
</template>

<script setup lang="ts">
import GlobalLoader from '@/components/common/GlobalLoader.vue';
import  MapWindow  from './pages/MapWindow.vue';
import {useMapStore} from '@/store/store'
import {useCreateAndInitMap} from '@/composables/createAndInitMap'
import { onMounted } from "vue";
const createMap = useCreateAndInitMap()
const MapStore = useMapStore()
onMounted(() => {
    createMap.createPoints() 
})
</script>

<style lang="scss">
@import './styles/styles.scss';
</style>
