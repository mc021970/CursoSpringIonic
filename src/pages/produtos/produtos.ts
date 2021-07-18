import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];
  categoria: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public catserv: CategoriaService,
    public loadc: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {

    console.log('ionViewDidLoad ProdutosPage');
    this.catserv.getCategoria(this.navParams.get('categoria_id')).subscribe(
      response => {
        this.categoria = response['nome'];
      },
      error => {
        this.categoria = 'Produtos';
      }
    );
    let loader = this.presentLoading();
    this.catserv.findProdutosByCategoria(this.navParams.get('categoria_id')).subscribe(
      response => {
        this.items = response['content'];
        this.loadImages();
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      }
    );
  }

  loadImages() {
    for (var i =0; i < this.items.length; i++) {
      let item = this.items[i];
      item.imageUrl = `${API_CONFIG.imageUrl}/prod${item.id}-small.jpg`;

    }
  }

  showProduto(produto_id: string) {
    this.navCtrl.push("ProdutoDetailPage", {
      produto_id: produto_id
    });
  }

  presentLoading() {
    let loader = this.loadc.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    console.log('Recarregando produtos',refresher);

    setTimeout(() => {
      this.loadData();
      console.log('Recarregou');
      refresher.complete();
    }, 1000);
  }

}
