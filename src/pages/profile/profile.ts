import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { LocalUser } from './../../models/localuser';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
      }
      );
    }
  }

  getImageIfExists() {
    this.clienteserv.getPhoto()
      .subscribe((blob : any) => {
        let objectURL = URL.createObjectURL(blob);       
        this.foto = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      },
      error => {
        console.log("Não obteve imagem de perfil");
      }
      );
  }

}
