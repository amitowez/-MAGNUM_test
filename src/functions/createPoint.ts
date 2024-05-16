
import {maxLat, maxLon, minLat, minLon} from '@/consts/minMaxCoord'
import { useMapStore } from "@/store/store";
import {  reactive } from "vue";
import {Coordinates, DataPoint} from '@/interfaces'
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {fromLonLat} from 'ol/proj';

export function createPoint(id:number) {
    const MapStore = useMapStore()
    const { lon, lat }: Coordinates = getCoord();
    MapStore.points[id] = reactive<DataPoint>({
        id,
        place: randomWords(),
        desc: randomWords(),
        lon: lon,
        lat: lat,
        inExtent: false,
        showInMap: true,
        iconActive: false
    })
    const point = MapStore.points[id]
    const feature = new Feature({
       geometry: new Point(fromLonLat([point.lon, point.lat])),
    }) 
    feature.setId(point.id)
    MapStore.featuresPoint.push(feature);
}
function randomWord(): string{
    const abc: string = "abcdefghijklmnopqrstuvwxyz";
    let result: string = "";
    while (result.length < 6) {
        result += abc[Math.floor(Math.random() * abc.length)];
    }
    // console.log(result)
    return result
}
function randomWords(): string{
    return randomWord() + ' ' + randomWord()+ ' ' + randomWord()
}
function getCoord(): Coordinates{
    const lat: number = randomCoord(minLat, maxLat)
    const lon: number = randomCoord(minLon, maxLon)
    return {lon, lat}
}
function randomCoord(min: number, max: number): number {
    let numStr: string = (min + Math.random() * (max - min))+'';
    if(numStr.length < 10) numStr+'000000'
    numStr = numStr.slice(0, 9)
    const result: number = Number(numStr)
    return result
}

export {  randomWords, getCoord  }