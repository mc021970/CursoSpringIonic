import { LocalUser } from './../../models/localuser';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  enderecos: EnderecoDTO[]

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public cliserv: ClienteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickAddressPage');
    let user = this.storage.getLocalUser();
    if (user && user.email) {
      this.cliserv.findByEmail(user.email).subscribe(
        response => {
          this.enderecos = response['enderecos'];
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

  nextPage(endereco: EnderecoDTO) {
    
  }
}
