<template>
    <div>
        <GlobalLoader v-if="!initMap.showMap.value" />
    </div>
</template>
<script setup lang="ts">
import GlobalLoader from '@/components/common/GlobalLoader.vue';
import {useMapStore} from '../store/store'
import {useCreateAndInitMap} from '../composables/createAndInitMap'
const initMap = useCreateAndInitMap()
console.log('comp',initMap.showMap.value)

const mapStore = useMapStore()

</script>
<style lang="scss" />