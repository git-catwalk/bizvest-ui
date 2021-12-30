import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "./config";
import {BehaviorSubject, Observable} from "rxjs";
export interface Tenant{
  id:string | null;
  name:string | null;
}

@Injectable()
export class SaasyService {
  constructor(public http: HttpClient,public config:Config ) { }

  listTenants():Observable<Array<Tenant>> {
    return this.http.get<Array<Tenant>>(this.config.api + "/rest/saasy/my-tenants");
  }

  setTenant(tenant: Tenant) {
    localStorage.setItem("saasy-tenant",JSON.stringify(tenant));
  }

  getTenant():Observable<Tenant>{
    const stored_tenant = localStorage.getItem("saasy-tenant");
    const tenant:Tenant = stored_tenant?JSON.parse(stored_tenant):{name:"Select A Tenant",id:null};
    return new BehaviorSubject(tenant).asObservable();
  }

}
