import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService, UserModel } from '../user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private userService: UserService
  ) {
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirmacionPassword': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // Cualquier código que quieras ejecutar cuando se inicie el componente
  }

  async guardar() {
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    const usuario: UserModel = {
      correo: f.correo,
      password: f.password,
      token: null // Incluye el token como null al registrar un nuevo usuario
    };

    this.userService.addUser(usuario).then(async () => {
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Tu registro se ha completado exitosamente.',
        buttons: ['Aceptar']
      });

      await alert.present();
      this.router.navigate(['/login']);
    });
  }
}
