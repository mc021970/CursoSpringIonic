import { ProdutoDTO } from './../../models/produto.dto';
import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {
    constructor(public http: HttpClient) {

    }

    getCategoria(id: string) {
        return this.http.get<CategoriaDTO>(`${API_CONFIG.baseUrl}/categorias/${id}`);
    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

    findProdutosByCategoria(id: string) : Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos?categorias=${id}`);
    }

    getProduto(id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${id}`);
    }
}