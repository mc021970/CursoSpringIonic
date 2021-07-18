import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: any;

  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10];

  fg: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder) {
      this.pedido = this.navParams.get('pedido');
      console.log(this.pedido);
      this.fg = this.fb.group({
        numeroParcelas: [1, Validators.required],
        "@type": ["PagamentoCartao", Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  nextPage() {
    console.log(this.pedido);
    this.pedido.pagamento = this.fg.value;
    console.log(this.pedido);
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
  }

}
