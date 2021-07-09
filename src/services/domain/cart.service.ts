import { HttpClient } from '@angular/common/http';
import { Cart } from './../../models/cart';
import { ProdutoDTO } from './../../models/produto.dto';
import { Injectable } from "@angular/core";
import { StorageService } from './../storage.service';

@Injectable()
export class CartService {
    constructor(public http: HttpClient,
        public storage: StorageService) {
    }

    getCart(): Cart {
        let cart : Cart = this.storage.getCart();
        if (cart == null) {
            cart = {items: []};
        }
        return cart;
    }

    eraseCart() {
        this.storage.setCart(null);
    }

    addItemtoCart(p: ProdutoDTO) {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == p.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: p});
        }
        else {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
    }
}