import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    this.menu.enable(false);
    console.log('Home.ionViewWillEnter');
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
    this.menu.enable(true);
    console.log('Home.ionViewDidLeave');
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {
        console.log(error);
      });
  }

  login() {
    console.log(this.creds);
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {
        console.log(error);
      });
    
  }

}
