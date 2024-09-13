import { Injectable } from '@angular/core';
import Dexie from 'dexie';

// Define la interfaz Viaje
export interface Viaje {
  id?: number;
  destino: string;
  tarifa: number;
  capacidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  viajes: Dexie.Table<Viaje, number>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      viajes: '++id,destino,tarifa,capacidad',
    });

    this.viajes = this.table('viajes');
  }

  async agregarViaje(viaje: Viaje) {
    await this.viajes.add(viaje);
  }

  async obtenerViajes(): Promise<Viaje[]> {
    return this.viajes.toArray();
  }

  async eliminarViajes() {
    // Elimina todos los viajes almacenados
    await this.viajes.clear();
  }
}
