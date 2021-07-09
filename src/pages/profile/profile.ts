import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  foto: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteserv: ClienteService,
    public sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteserv.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
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

}
