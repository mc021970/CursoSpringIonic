import { StorageService } from './../storage.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient,
        public storage: StorageService) {

    }

    findByEmail(email: string) : Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
    }

    getPhoto() : Observable<any> {
        let imagem = this.http.get(`${API_CONFIG.baseUrl}/clientes/foto`, 
            {responseType: 'blob'});
        console.log('Imagem: ' + imagem);
        return imagem;
    }
}