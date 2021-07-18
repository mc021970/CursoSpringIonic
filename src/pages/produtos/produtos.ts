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

  items: ProdutoDTO[] = [];
  categoria: string;
  page: number=0;

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
    console.log('Categoria a carregar: ' + this.categoria);
    let loader = this.presentLoading();
    this.catserv.findProdutosByCategoria(this.navParams.get('categoria_id'), this.page, 5).subscribe(
      response => {
        console.log('Carregou categoria: ' + this.categoria);
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        console.log('Pagina: ' + this.page + ", items: " + this.items.length);
        this.loadImages(start, end);
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      }
    );
  }

  loadImages(start: number, end: number) {
    for (var i = start; i <= end; i++) {
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
      this.page = 0;
      this.items = [];
      this.loadData();
      console.log('Recarregou');
      refresher.complete();
    }, 1000);
  }

  doInfinity(infinity) {
    console.log('Carregando página de produtos',infinity);

    setTimeout(() => {
      this.page++;
      this.loadData();
      console.log('Carregou');
      infinity.complete();
    }, 1000);
  }
}
