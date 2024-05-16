import {boundingExtent} from 'ol/extent.js';
import { useMapStore } from "@/store/store";
// или анимация приближения или айди точки для открытия карточки
export function clickInMapFunc(event: MouseEvent, CLUSTERS: any, MAP: any): any {
    const MapStore = useMapStore()
    CLUSTERS.getFeatures(MAP.getEventPixel(event)).then((clickedFeatures:any) => {
        if (clickedFeatures.length) {
            const features = clickedFeatures[0].get('features');
            if (features.length > 1) {
                const extent = boundingExtent(
                  features.map((r: any) => r.getGeometry().getCoordinates())
                );
                MAP.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
            } else {
                const feature = features[0]
                console.log(feature)
                console.log(feature.getGeometry())
                MapStore.activeCardId = feature.getId()
            }
        } else {
            MapStore.activeCardId = 0
        }
    });
};