import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

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

  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
