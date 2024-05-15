import { defineStore } from 'pinia'
import { State } from '../interfaces'

export const useMapStore = defineStore('MapStore', {
  state: (): State => ({
    points: {},
  }),
})