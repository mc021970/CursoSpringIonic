import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alert: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no ErrorInterceptor");
        return next.handle(req)
        .catch((error, caught) => {
            console.log(error);
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch (errorObj.status) {
                case 401:
                    this.handle401();
                    break;

                case 403:
                    this.handle403();
                    break;
            
                default:
                    this.handleOtherErrors(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handleOtherErrors(errorObj) {
        let ae = this.alert.create({
            title: 'Erro Inesperado: ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        ae.present();

    }

    handle401() {
        let a401 = this.alert.create({
            title: 'Falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        a401.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};