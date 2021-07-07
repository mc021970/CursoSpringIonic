import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public catserv: CategoriaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');

    this.catserv.findProdutosByCategoria(this.navParams.get('categoria_id')).subscribe(
      response => {
        this.items = response['content'];
      },
      error => {}
    );
  }

}
