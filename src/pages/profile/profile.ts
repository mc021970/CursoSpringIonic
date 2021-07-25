import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  foto: any;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteserv: ClienteService,
    public sanitizer: DomSanitizer,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {

    console.log('ionViewDidLoad ProfilePage');
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteserv.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.getImageIfExists();
        },
      error => {
        console.log(error);
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      }
      );
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {
    this.clienteserv.getPhoto()
      .subscribe((blob : any) => {
        let objectURL = URL.createObjectURL(blob);       
        this.foto = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      },
      error => {}
      );
  }

  

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }

  sendPicture() {
    this.clienteserv.uploadPicture(this.picture).subscribe(
      response => {
        this.picture = null;
        this.loadData();
      },
      error => {

      }
      );
  }

  cancel() {
    this.picture = null;
  }
}
