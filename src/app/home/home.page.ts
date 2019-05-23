import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentImage = null;
  endereco: string; 
  numero: string; 
  textarea: string; 
  asfalto: string;
  outros: string; 
 
  constructor(public navCtrl: NavController, private camera: Camera, private emailComposer: EmailComposer){ }

  exitApp() {
    navigator['app'].exitApp();  
  };

  captureImage(){

    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, 
      destinationType: this.camera.DestinationType.FILE_URI
    }

    this.camera.getPicture(options).then(ImageData => {
      this.currentImage = ImageData;

    }, err => {
      console.log('Image error:', err );
    });

  }

  sendEmail(){

    let email = {
      to: 'alexandretuti@gmail.com',
      cc: 'alexandretuti@gmail.com',
      attachments: [
        this.currentImage
      ],
      subject: 'SACI-Sistema de atendimento ao cidadão Itapolitano',
      body: 'Endereco:' + this.endereco + ' Numero: ' + this.numero + ' Descrição do ocorrido: ' + this.textarea ,
      isHtml: true
    };

    this.emailComposer.open(email);

  }

  cleanForms(){

    alert('Endereco:' + this.endereco + ' Numero: ' + this.numero + ' Descrição do ocorrido: ' + this.textarea + ' Asfalto' + this.asfalto + 'Outros' + this.outros ); 

    this.endereco = "";
    this.numero = "";
    this.textarea = "";

    if(this.asfalto == 'true' ) {
      alert('Asfalto');
    }else{
      alert('Outros');
    }

  }

}

