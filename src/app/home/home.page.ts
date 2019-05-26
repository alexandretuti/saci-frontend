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
  secretarias: string; 
 
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

    if(this.endereco == undefined){
      alert('Preencha as informações do campo Endereço');
      return;
    }

    if(this.numero == undefined){
      alert('Preencha as informações do campo Número');
      return; 
    }

    if(this.textarea == undefined){
      alert('Descreva o Ocorrido');
      return; 
    }

    let email = {
      to: 'alexandretuti@gmail.com',
      cc: 'alexandretuti@gmail.com;Salata.gislaine@ig.com.br;joaoantoniofreitas@yahoo.com.br;anderson.ap.semensato@gmail.com',
      attachments: [
        this.currentImage
      ],
      subject: 'TESTE-SACI-Sistema de atendimento ao cidadão Itapolitano',
      body: 'TESTE<br> <b>Endereco:</b>' + this.endereco + '<br> <b>Numero:</b> ' + this.numero + '<br> <b>Descrição do ocorrido:</b> ' + this.textarea ,
      isHtml: true
    };
     
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');

    this.emailComposer.open(email);

    
    
    this.cleanForms();

  }
  
  cleanForms(){

    this.endereco = "";
    this.numero = "";
    this.textarea = "";
    this.currentImage = null; 

  }

}

