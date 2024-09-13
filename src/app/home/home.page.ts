import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  correoUsuario: string | null;

  constructor(public userService: UserService, private router: Router, private alertController: AlertController) {
    // Puedes inicializar correoUsuario con el valor del usuario actual desde el UserService
    this.correoUsuario = this.userService.currentUserEmail;
  }

  ngOnInit() {}

  async logout() {
    // Llama al método de cierre de sesión de UserService
    this.userService.logout();

    // Muestra una alerta de sesión cerrada correctamente
    const alert = await this.alertController.create({
      header: 'Sesión Cerrada',
      message: 'Sesión cerrada correctamente.',
      buttons: ['Aceptar']
    });

    await alert.present();

    // Redirige a la página de inicio de sesión (o cualquier otra página que desees)
    this.router.navigate(['/login']); // Asegúrate de importar el Router y tenerlo disponible en tu componente.
  }
}
