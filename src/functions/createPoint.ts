import { useMapStore } from "@/store/store";
import {maxLat, maxLon, minLat, minLon} from '@/consts/minMaxCoord'
import {Coordinates, Point} from '@/interfaces'
import {reactive} from 'vue'

export function createPoint(id: number){
    const MapStore = useMapStore()
    const { lon, lat }: Coordinates = getCoord();
    MapStore.points[id] = reactive<Point>({
        id,
        place: randomWords(),
        desc: randomWords(),
        lon: lon,
        lat: lat,
    })
    console.log(MapStore.points[id])
}
function randomWords(): string{
    const abc: string = "abcdefghijklmnopqrstuvwxyz";
    let result: string = "";
    while (result.length < 6) {
        result += abc[Math.floor(Math.random() * abc.length)];
    }
    console.log(result)
    return result
}
function getCoord(): Coordinates{
    const lat: number = randomCoord(minLat, maxLat)
    const lon: number = randomCoord(minLon, maxLon)
    return {lon, lat}
}
function randomCoord(min: number, max: number): number {
    return min + Math.random() * (max - min);
}