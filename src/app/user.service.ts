import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface UserModel {
  id?: number;
  correo: string;
  password: string;
  token: string | null; // Nueva propiedad para el token JWT
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private db: Dexie;
  currentUserEmail: string | null;
  currentUserToken: string | null; // Propiedad para almacenar el token del usuario actual

  constructor() {
    this.db = new Dexie('UserDatabase');
    this.db.version(1).stores({
      users: '++id,correo,password,token', // Agregar 'token' a la definición de la base de datos
    });

    this.currentUserEmail = null;
    this.currentUserToken = null; // Inicializa currentUserToken como nulo
  }

  async addUser(user: UserModel): Promise<void> {
    await this.db.table('users').add(user);
  }

  async getUserByEmail(correo: string): Promise<UserModel | undefined> {
    return this.db.table('users').where('correo').equals(correo).first();
  }

  async authenticateUser(correo: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(correo);

    if (user && user.password === password) {
      this.currentUserEmail = correo;
      this.currentUserToken = user.token; // Almacena el token del usuario
      return true;
    }

    return false;
  }

  async deleteUser(id: number): Promise<void> {
    await this.db.table('users').delete(id);
  }

  async updateUser(id: number, updatedUser: UserModel): Promise<void> {
    await this.db.table('users').update(id, updatedUser);
  }

  async getAllUsers(): Promise<UserModel[]> {
    return this.db.table('users').toArray();
  }

  // Agregar el método logout para borrar información de usuario almacenada
  logout(): void {
    this.currentUserEmail = null;
    this.currentUserToken = null; // Elimina el token al cerrar sesión
    // También puedes eliminar cualquier otra información de usuario almacenada
  }
}
