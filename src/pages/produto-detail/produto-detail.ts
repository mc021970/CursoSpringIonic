import { CartService } from './../../services/domain/cart.service';
import { CategoriaService } from './../../services/domain/categoria.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public catserv: CategoriaService,
    public cartserv: CartService, 
    public alert: AlertController) {
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

  addToCart(produto : ProdutoDTO) {
    this.cartserv.addItemtoCart(produto);

    let a = this.alert.create({
      title: 'Carrinho de Compras',
      message: produto.nome + ' inserido no carrinho',
      enableBackdropDismiss: false,
      buttons: [
          {
              text: 'Ok'
          }
      ]
    });
    a.present();
  }

  showCart() {
    this.navCtrl.setRoot("CartPage");
  }
}
