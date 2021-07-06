import { ClienteService } from './../../services/domain/cliente.service';
import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { LocalidadeService } from './../../services/domain/localidade.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  fg : FormGroup;
  estados : EstadoDTO[];
  cidades : CidadeDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public localserv: LocalidadeService,
    public cliserv: ClienteService,
    public alertC: AlertController) {
      this.fg = this.fb.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]] 
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.localserv.findEstados().subscribe(response => {
      this.estados = response;
      this.fg.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {})
  }

  updateCidades() {
    let id_estado = this.fg.value.estadoId;
    this.localserv.findCidades(id_estado).subscribe(response => {
      this.cidades = response;
      this.fg.controls.cidadeId.setValue(null);
    },
    error => {})
  }

  signupUser() {
    console.log(this.fg.value);
    this.cliserv.insert(this.fg.value).subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

  showInsertOk() {
    let alert = this.alertC.create({
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (this.navCtrl.canGoBack()) {
              this.navCtrl.pop();
            }
            else {
              this.navCtrl.setRoot('HomePage');
            }
          }
        }
      ]
    });
    
    alert.present();
  }

}
