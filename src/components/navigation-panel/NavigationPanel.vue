<template>
    <div class="card-container" ref="panel"  >
        <template 
            v-for="id in showCard " 
            :key="id">
                <CardInPanel :card="MapStore.points[id]" />
        </template>
        <div class="pagin-btn-cont centried">
            <div 
                @click="changecards(-10)" 
                class="pagin-btn centried">
                -10
            </div>
            <div 
                @click="changecards(+10)" 
                class="pagin-btn centried">
                +10
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import {useMapStore} from '@/store/store'
import CardInPanel from './CardInPanel.vue'
const showCard: Ref<number> = ref(10)
const MapStore = useMapStore()

function changecards(count: number): void{
   if(showCard.value + count >= 0 && showCard.value + count < MapStore.counterPoints){
    showCard.value += count
   } else if(showCard.value + count <= 0){
    showCard.value = 10 
   }
}

</script>
<style lang="scss" />