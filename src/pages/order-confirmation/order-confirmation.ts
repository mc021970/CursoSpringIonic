import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: any;
  cartItems : CartItem[];
  cliente: any;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartserv: CartService,
    public cliserv: ClienteService) {
      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationPage');
    this.cartItems = this.cartserv.getCart().items;
    console.log('Items: ');
    console.log(this.cartItems);
    let clientePed = this.pedido['cliente'];

    console.log("cliente: ");
    console.log(clientePed);

    let idCliente = clientePed['id'];
    console.log("id cliente: " + idCliente);

    this.cliserv.findById(idCliente).subscribe(
      response => {
        this.cliente = response;
        let endPed = this.pedido['enderecoDeEntrega'];
        console.log("Endereco pedido: ");
        console.log(endPed);
        let idEnd = endPed['id'];
        console.log("Id Endereco pedido: " + idEnd);
        this.endereco = this.findAddress(idEnd, this.cliente['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      }
    );
  }

  private findAddress(id: string, list: any[]): any {
    console.log("procurando id: " + id);
    console.log(list);
    for (let i = 0; i < list.length; i++) {
      let end = list[i];
      console.log(end);
      if (id == end.id) return end;

    }
    console.log("Não encontrou enereco");
    return null;
  }

  getTotal() {
    return this.cartserv.getTotal();
  }

  checkout() {
    console.log("Vai criar pedido: ");
    console.log(this.pedido);
    this.cliserv.insertOrder(this.pedido).subscribe(
      response => {
        console.log(response.headers.get("location"));
        this.codpedido = this.extractId(response.headers.get('location'));
        this.cartserv.eraseCart();
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot("HomePage");
        }
      }
    );
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }
}
