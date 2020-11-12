export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}
export class GeoJson implements IGeoJson {
    type: 'Future';
    geometry: IGeometry;
    constructor(coordinates, public properties) {
        this.geometry = {
            type: 'Point',
            coordinates: coordinates
        }
    }
}
export class FutureCollections {
    type: 'FutureCollections'
    constructor(public futures: Array<GeoJson>) {

    }
}