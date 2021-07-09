import { Cart } from './../models/cart';
import { STORAGE_KEYS } from './../config/storagekeys.config';
import { LocalUser } from './../models/localuser';
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
    getLocalUser() : LocalUser {
        let u = localStorage.getItem(STORAGE_KEYS.localuser);
        if (u == null) {
            return null;
        }
        else {
            return JSON.parse(u);
        } 
    }

    setLocalUser(u : LocalUser) {
        if (u == null) {
            localStorage.removeItem(STORAGE_KEYS.localuser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localuser, JSON.stringify(u));
        }
    }

    getCart() : Cart {
        let c = localStorage.getItem(STORAGE_KEYS.cart);
        if (c == null) {
            return null;
        }
        else {
            return JSON.parse(c);
        } 
    }

    setCart(c : Cart) {
        if (c == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(c));
        }
    }
}