import { defineStore } from 'pinia'
import { State } from '../interfaces'
import { ref } from 'vue'

export const useMapStore = defineStore('MapStore', {
  state: (): State => ({
    points: {},
    featuresPoint:[],
    counterPoints: 100000, // 100к
    showMap: ref(false),
    activeCardId: ref(0)
  }),
})