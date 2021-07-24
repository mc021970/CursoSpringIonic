import { ImageUtilService } from './../image.util.service';
import { StorageService } from './../storage.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient,
        public storage: StorageService,
        public imageUtil: ImageUtilService) {

    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    getPhoto() : Observable<any> {
        let imagem = this.http.get(`${API_CONFIG.baseUrl}/clientes/foto`, 
            {responseType: 'blob'});
        console.log('Imagem: ' + imagem);
        return imagem;
    }

    insert(cli: ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, cli, {
            observe: 'response',
            responseType: 'text'
        });
    }

    insertOrder(pedido: any) {
        return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido, {
            observe: 'response',
            responseType: 'text'
        });
    }

    uploadPicture(picture) {
        let blob = this.imageUtil.dataUriToBlob(picture);
        let form: FormData = new FormData();
        form.set('arquivo', blob, 'arquivo.png');
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/foto`, form, {
            observe: 'response',
            responseType: 'text'
        });
    }
}