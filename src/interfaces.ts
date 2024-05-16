import { Ref } from "vue"
export interface DataPoint {
    id: number
    place: string
    desc: string
    lon: number
    lat: number
    inExtent: boolean
    showInMap: boolean
    iconActive: boolean
}
export interface Coordinates {
    lon: number;
    lat: number;
}
// export interface Zoom {
//     value: Ref<number>
// }
// export interface ShowMap {
//     status: boolean;
// }
export interface State { // знаю что стейт будет один
    points: {[name: number]: DataPoint}
    counterPoints: number 
    featuresPoint: any[]
    showMap: Ref<boolean>
    activeCardId: Ref<number>
}
