import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  // Establecer el estado de autenticación
  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
  }

  // Verificar si el usuario está autenticado
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Método para cerrar la sesión
  logout(): void {
    // Aquí puedes realizar tareas de cierre de sesión si es necesario
    // Por ejemplo, eliminar tokens de autenticación, datos de usuario, etc.
    // Luego, establece el estado de autenticación como falso
    this.isAuthenticated = false;
  }
}
