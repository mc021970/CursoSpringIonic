import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  imageUrl: String = API_CONFIG.imageUrl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public catserv: CategoriaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
    this.catserv.findAll().subscribe(
      response => {
        this.items = response;
      },
      error => {
        console.log(error);
        
      }
    );
  }

}
