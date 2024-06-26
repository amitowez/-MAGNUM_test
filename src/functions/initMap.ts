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
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Cluster, Vector as VectorSource} from 'ol/source.js';
import { useMapStore } from "@/store/store";
export function initMapFunc(ref: any, centerCoord: number[]): any{
  const source = getSource()
  const clusterSource = getClusterSource(source) 
  const CLUSTERS = getCluster(clusterSource)
  const VIEW =  getView(centerCoord)
  const layer = getLayer()
  const MAP = new Map({
      layers: [
        layer,
        CLUSTERS,
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

function getSource():VectorSource{
  const MapStore = useMapStore()
  return new VectorSource({
    features: MapStore.featuresPoint,
});
}
function getLayer(){
  return new TileLayer({
    source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
})
}
function getView(coord: number[]): View{
  return new View({
    center: fromLonLat(coord),
    zoom:11,
  })
}
function getClusterSource(source:VectorSource): VectorSource{
  return new Cluster({
    distance: parseInt("100", 10),
    minDistance: parseInt("100", 10),
    source: source,
  });
}
function getCluster(clusterSource: VectorSource){
  const MapStore = useMapStore()
  return  new VectorLayer({
    source: clusterSource,
    style: function (feature) {
      const featId: number = feature.get('features')[0].getId()
      const size: number = feature.get('features').length;
      let style;
      if (!style && MapStore.points[featId].showInMap) {
        style = new Style({
          image: new CircleStyle({
            radius: 10,
            stroke: new Stroke({
              color:  MapStore.activeCardId === featId ? 'red' :'#b40ff9',
            }),
            fill: new Fill({
              color:  MapStore.activeCardId === featId ? 'red' :'#b40ff9',
            }),
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: '#fff',
            }),
          }),
        });
      }
      return style;
    },
  });
}