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

    addItemtoCart(p: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == p.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: p});
        }
        else {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeItemFromCart(p: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == p.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    changeQuantity(p: ProdutoDTO, qtde: number) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == p.id);
        if (position != -1) {
            cart.items[position].quantidade += qtde;
            if (cart.items[position].quantidade < 0) {
                cart.items[position].quantidade = 0;
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    getTotal() : number {
        let cart = this.getCart();
        let total = 0;
        for (let i = 0; i < cart.items.length; i++) {
            total += cart.items[i].quantidade * cart.items[i].produto.preco;
        }
        return total;
    }
}