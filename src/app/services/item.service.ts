import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import  {Item}  from "./app-model";
import {Page} from "./page";

@Injectable()
export class ItemService {
    constructor(public http: HttpClient,public config:Config ) { }

    search(term:string = '',page:number = 0,limit:number = 50):Observable<Page<Item>> {
        let url:string = this.config.api + "/rest/item/search";
        const params = new HttpParams()
        .set('page', String(page))
        .set('term',term)
        .set('limit',limit);
        return this.http.get<Page<Item>>(url, {params});
    }

    list():Observable<Array<Item>> {
        return this.http.get<Array<Item>>(this.config.api + "/rest/item");
    }

    save(model: Item):Observable<Item>{
        return this.http.post<Item>(this.config.api + "/rest/item", model);
    }

    getById(id: string):Observable<Item> {
        return this.http.get<Item>(this.config.api + "/rest/item/" + id);
    }

    removeById(id: string | null):Observable<any>{
        return this.http.delete<any>(this.config.api + "/rest/item/" + id);
    }
}
