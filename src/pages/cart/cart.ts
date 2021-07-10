import { ProdutoDTO } from './../../models/produto.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartserv: CartService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.items = this.cartserv.getCart().items;
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].produto.imageUrl = `${API_CONFIG.imageUrl}/prod${this.items[i].produto.id}-small.jpg`;
    }
  }

  remove(produto: ProdutoDTO) {
    this.items = this.cartserv.removeItemFromCart(produto).items;
  }

  change(produto: ProdutoDTO, qtde: number) {
    this.items = this.cartserv.changeQuantity(produto, qtde).items;
  }

  getTotal() : number {
    return this.cartserv.getTotal();
  }

  goOn() {
    this.navCtrl.setRoot("CategoriasPage");
  }

  checkout() {
    this.navCtrl.setRoot("PickAddressPage");
  }
}
