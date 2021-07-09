import { CategoriaService } from './../../services/domain/categoria.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  produto: ProdutoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public catserv: CategoriaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoDetailPage');
    this.catserv.getProduto(this.navParams.get('produto_id')).subscribe(
      response => {
        this.produto = response;
        this.produto.imageUrl = `${API_CONFIG.imageUrl}/prod${this.produto.id}.jpg`;
      },
      error => {
        this.navCtrl.setRoot('CategoriasPage');
      }
    );
  }

}
