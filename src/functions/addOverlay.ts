import Overlay from 'ol/Overlay.js';
export function addOverlayCard(ref: any, map: any, type: string): object{
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