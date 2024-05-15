import { onMounted, ref } from "vue";
import { createPoint } from "@/functions/createPoint";
export const useCreateAndInitMap = ()=>{
    let showMap = ref(false);
    const counterPoints: number = 30000

    function createPoints(){
        for(let i: number = 1;i<=counterPoints;i++){
            createPoint(i)
        }
    }

    onMounted(() => {
        createPoints()
        showMap.value = true
    })
    return {
        showMap,
    }
}