<template>
    <div 
        @click="MapStore.activeCardId = props.card.id" 
        :class="props.card.showInMap ? 'card-in-panel-active' : 'card-in-panel-passive'" 
        class="card-in-panel"
        >
        <div style="display: flex;align-items: center; justify-content: flex-start;">
            <input  type="checkbox" v-model="props.card.showInMap">
            <LineCard :desc="'Идентификатор'" :value="props.card.id" />
        </div>
        <LineCard :desc="'Описание'" :value="props.card.desc" />
        <LineCard :desc="'Адрес'" :value="props.card.place" />
    </div>
</template>

<script setup lang="ts">
import LineCard from '../common/LineCard.vue'
import { useMapStore } from '@/store/store';
const MapStore = useMapStore()
const props = defineProps(['card'])

</script>
<style lang="scss" />