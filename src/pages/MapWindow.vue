<template>
    <div class="content-container">
        <div class="list-panel">
            <NavigationPanel />
        </div>
        <div class="map-container" @click="createMap.clickInMapFunc($event, CLUSTERS, MAP)" ref="map">
            <div ref="cardInMap" >
                <div class="open-card" v-if="MapStore.activeCardId != 0 && mapLoad && MapStore.points[MapStore.activeCardId].showInMap" >
                    <MapPointCard :card="MapStore.points[MapStore.activeCardId]" />
                <div class="open-card-bottom-rect"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useCreateAndInitMap} from '@/composables/createAndInitMap'
import {useMapStore} from '@/store/store'
import { Ref, onMounted, ref, watch } from "vue";
import MapPointCard from '@/components/in-map/MapPointCard.vue';
import {fromLonLat} from 'ol/proj';
import {addOverlayCard} from '@/functions/addOverlay'
import  NavigationPanel  from '@/components/navigation-panel/NavigationPanel.vue'

const MapStore = useMapStore();
const createMap = useCreateAndInitMap();
const map:Ref = ref();
const cardInMap:Ref = ref();
const mapLoad: Ref<boolean> = ref(false)
let cardInMapOL: object;
let MAP: object;
let VIEW: object;
let CLUSTERS: any;


onMounted(() => {
    // console.log(MapStore.points)
    MapStore.activeCardId = 1
    const mapData  = createMap.initMapFunc(map.value, [MapStore.points[MapStore.activeCardId].lon, MapStore.points[MapStore.activeCardId].lat])
    MAP = mapData.MAP
    VIEW = mapData.VIEW
    CLUSTERS = mapData.CLUSTERS
    cardInMapOL = addOverlayCard(cardInMap.value,MAP,'card')
    mapLoad.value = true
})

watch(
    ()=> MapStore.activeCardId,
    (val)=>{
        openCard(val)
    }
)

function openCard(val: number){
    if(val === 0) return
    const card = MapStore.points[MapStore.activeCardId]
    card.iconActive = true 
    const pointCoord = fromLonLat([card.lon,card.lat])
    //@ts-ignore
    cardInMapOL.setPosition(pointCoord)
    //@ts-ignore
    VIEW.setCenter(pointCoord)
}

</script>
<style lang="scss" />