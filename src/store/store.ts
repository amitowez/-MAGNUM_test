import { defineStore } from 'pinia'
import { State } from '../interfaces'
import { ref } from 'vue'

export const useMapStore = defineStore('MapStore', {
  state: (): State => ({
    points: {},
    featuresPoint:[],
    showMap: ref(false)
  }),
})