<template>
    <div class="content-container">
        <div class="list-panel">
            <p>{{ activeCardId }}</p>
        </div>
        <div class="map-container" @click="clickInMap($event)" ref="map">
            <div ref="cardInMap" >
                <div class="open-card" v-if="activeCardId != 0 && mapLoad" >
                    <MapPointCard :card="MapStore.points[activeCardId]" />
                <div class="open-card-bottom-rect"/>
                </div>

            </div>
            <!-- <template v-if="mapLoad">
                <template v-for="(point, index) in MapStore.points" :key="index" >
                    <MapPoint 
                        v-if="point.showInMap && point.inExtent"
                        :point="point" 

                        :MAP="MAP"
                        :VIEW="VIEW"
                        @openCard="(val: Point) =>openCard(val)" />
                </template>
            </template> -->


        </div>
    </div>
</template>
<script setup lang="ts">
import { addOverlayCard } from '@/functions/addOverlay'
import {useCreateAndInitMap} from '@/composables/createAndInitMap'
import {boundingExtent} from 'ol/extent.js';
import {useMapStore} from '@/store/store'
import { onMounted, ref } from "vue";
import MapPointCard from '@/components/in-map/MapPointCard.vue';
import {fromLonLat} from 'ol/proj';
const MapStore = useMapStore();
const createMap = useCreateAndInitMap();
const activeCardId = ref(0);
const map = ref();
const cardInMap = ref();
const mapLoad = ref(false)
let cardInMapOL: any;
let MAP: any;
let VIEW: any;
let CLUSTERS: any;
onMounted(() => {
    console.log(map)
    const mapData  = createMap.initMap(map.value)
    MAP = mapData.MAP
    VIEW = mapData.VIEW
    CLUSTERS = mapData.CLUSTERS
    cardInMapOL = addOverlayCard(cardInMap.value,MAP,'card')
    mapLoad.value = true
    openCard(1)
})
function openCard(val: number){
    if(MapStore.points[activeCardId.value]) MapStore.points[activeCardId.value].iconActive = false
    activeCardId.value = val
    if(val === 0) return
    const card = MapStore.points[activeCardId.value]
    card.iconActive = true 
    cardInMapOL.setPosition(fromLonLat([card.lon,card.lat]))
}
function clickInMap(event: PointerEvent) {
    CLUSTERS.getFeatures(MAP.getEventPixel(event)).then((clickedFeatures:any) => {
        if (clickedFeatures.length) {
            // Get clustered Coordinates
            const features = clickedFeatures[0].get('features');
            if (features.length > 1) {
                const extent = boundingExtent(
                  features.map((r: any) => r.getGeometry().getCoordinates())
                );
                MAP.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
            } else {
                console.log(clickedFeatures[0])
                const feature = clickedFeatures[0].get('features')[0]
                console.log(feature)
                console.log(feature.getGeometry())
                openCard(feature.getId())
            }
        } else {
            openCard(0)
        }
    });
};


</script>
<style lang="scss" />