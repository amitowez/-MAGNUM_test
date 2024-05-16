<template>
    <div 
        @click.capture="props.card.showInMap ? MapStore.activeCardId = props.card.id : ''" 
        :class="props.card.showInMap ? (props.card.id === MapStore.activeCardId ? 'card-in-panel-active' :  'card-in-panel-standart') : 'card-in-panel-off'" 
        class="card-in-panel"
        >
        <div style="display: flex;align-items: center; justify-content: flex-start;">
            <label class="container-checkbox">
              <input type="checkbox"  v-model="props.card.showInMap">
              <span class="checkmark"></span>
            </label>
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