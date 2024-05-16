// import { onMounted, reactive } from "vue";
import { createPoint }  from "@/functions/createPoint";
import { useMapStore } from "@/store/store";
// import {Coordinates, DataPoint} from '@/interfaces'
import Map from 'ol/Map.js';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import {fromLonLat} from 'ol/proj';
import {getCenter} from 'ol/extent';
import {mapExtent} from '@/consts/minMaxCoord';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Cluster, OSM, Vector as VectorSource} from 'ol/source.js';
// import {boundingExtent} from 'ol/extent.js';

export const useCreateAndInitMap = ()=>{
    const MapStore = useMapStore()
    const counterPoints: number = 50000
    async function createPoints(){
      for(let i: number = 1;i<=counterPoints;i++){
        createPoint(i)
      }
      MapStore.showMap = true
    }
    function initMap(ref: any){
      console.log(MapStore.featuresPoint)
      const source = new VectorSource({
          features: MapStore.featuresPoint,
      });
      const clusterSource = new Cluster({
        distance: parseInt("100", 10),
        minDistance: parseInt("100", 10),
        source: source,
      });
      const styleCache: any = {};
      const CLUSTERS = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
            const size = feature.get('features').length;
            let style = styleCache[size];;
            if (!style) {
              style = new Style({
                image: new CircleStyle({
                  radius: 10,
                  stroke: new Stroke({
                    color: '#b40ff9',
                  }),
                  fill: new Fill({
                    color: '#b40ff9',
                  }),
                }),
                text: new Text({
                  text: size.toString(),
                  fill: new Fill({
                    color: '#fff',
                  }),
                }),
              });
              styleCache[size] = style;
            }
            return style;
        },
      });
      const VIEW =  new View({
          center: fromLonLat(getCenter(mapExtent)),
          zoom:1,
      })
      const layer = new TileLayer({
          source: new XYZ({
              url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
      })
      const MAP = new Map({
        layers: [
          layer,
          CLUSTERS,
          // raster,
        ],
        target: ref,
        view:VIEW,
      });
      // @ts-ignore
      MAP.removeControl(MAP.getControls().array_[0])
      // @ts-ignore
      MAP.removeControl(MAP.getControls().array_[0])
      // @ts-ignore
      MAP.removeControl(MAP.getControls().array_[0])
      return {MAP, VIEW, CLUSTERS}
    }
    return {
        createPoints,
        initMap,
    }
}