import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage {
  correoElectronico: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async enviarSolicitudRecuperacion() {
    if (this.correoElectronico.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Campo Vacío',
        message: 'El campo de correo electrónico no puede quedar vacío.',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }

    // Aquí puedes agregar la lógica para enviar la solicitud de recuperación

    // Después de enviar la solicitud, muestra la alerta de recuperación enviada
    this.mostrarAlertaRecuperacionEnviada();
  }

  async mostrarAlertaRecuperacionEnviada() {
    const alert = await this.alertController.create({
      header: 'Recuperación Enviada',
      message: 'Se ha enviado un correo de recuperación a tu dirección de correo electrónico.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Redirige al usuario a la página de inicio de sesión
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
