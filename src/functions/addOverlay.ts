import { DataPoint } from '@/interfaces';
import Overlay from 'ol/Overlay.js';
import {fromLonLat} from 'ol/proj';
export function addOverlayPoint(ref: any, map: any, item: DataPoint){
    console.log(ref,map, item.id)
    const overlay = new Overlay({
        id: item.id,
        element: ref,
        stopEvent:false,
    });
    overlay.setPosition(fromLonLat([item.lon,item.lat]));
    // @ts-ignore
    overlay.getElement().style.zIndex = 1
    map.addOverlay(overlay);
    return overlay
}
export function addOverlayCard(ref: any, map: any, type: string){
    const overlay = new Overlay({
        id: type,
        element: ref,
        stopEvent:false,
    });
    // @ts-ignore
    overlay.getElement().style.zIndex = 4
    map.addOverlay(overlay);
    return overlay
}