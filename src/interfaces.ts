export interface Point {
    id: number
    place: string
    desc: string
    lon: number
    lat: number
}
export interface Coordinates {
    lon: number;
    lat: number;
  }

export interface State { // знаю что стейт будет один
    points: {[name: number]: Point}
}