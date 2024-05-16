// import { onMounted, reactive } from "vue";
import { createPoint }  from "@/functions/createPoint";
import { useMapStore } from "@/store/store";
import { initMapFunc } from '@/functions/initMap'
import {clickInMapFunc} from '@/functions/clickInMap'
export const useCreateAndInitMap = ()=>{
    const MapStore = useMapStore()
    function createPoints(){
      for(let i: number = 1;i<=MapStore.counterPoints;i++){
        createPoint(i)
      }
      MapStore.showMap = true
    }
    return {
        createPoints,
        initMapFunc,
        clickInMapFunc,
    }
}