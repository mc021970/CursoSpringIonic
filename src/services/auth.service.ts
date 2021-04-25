import { StorageService } from './storage.service';
import { LocalUser } from './../models/localuser';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authValue : string) {
        let authToken = authValue.substring(7);
        let u : LocalUser = {
            token : authToken
        };
        this.storage.setLocalUser(u);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}