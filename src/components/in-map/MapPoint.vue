<!-- <template>
    <div ref="point" class="map-point"  >
        <CircularPoint @click="changeOpenCard(props.point)" :point="props.point"/>
    </div>
</template>
<script setup lang="ts">
import { addOverlayPoint } from '@/functions/addOverlay'
import { DataPoint } from '@/interfaces';
import CircularPoint from './CircularPoint.vue'
import { onMounted, ref, onUnmounted } from 'vue';
const point = ref()
const props = defineProps(['point','MAP','VIEW'])
const emits = defineEmits(['openCard'])
onMounted(()=>{
    addOverlayPoint(point.value,props.MAP, props.point)
})
function changeOpenCard(val: DataPoint){
    emits('openCard',val)
}
onUnmounted(()=>{
    const overlay = props.MAP.getOverlayById(props.point.id)
    props.MAP.removeOverlay(overlay)
})
</script>
<style lang="scss" /> -->