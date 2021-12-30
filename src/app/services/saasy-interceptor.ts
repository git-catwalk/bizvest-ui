import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Tenant} from "./saasy-service";
import {environment} from "../../environments/environment";

@Injectable()
export class SaasyInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const stored_tenant = localStorage.getItem("saasy-tenant");
    const tenant:Tenant = stored_tenant?JSON.parse(stored_tenant):{name:"Select A Tenant",id:null};
    const TENANT_KEY = tenant.id ? tenant.id : null;
    const isApiUrl = httpRequest.url.startsWith(environment.api);
     if(TENANT_KEY &&  isApiUrl) {
       httpRequest = httpRequest.clone({
         setHeaders: { TENANT_KEY }
       });
     }
    return next.handle(httpRequest);
  }
}
