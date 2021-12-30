import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CallbackComponent} from "./callback/callback.component";
import {AuthGuard} from "./services/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ItemFormComponent} from "./item-form/item-form.component";
import {ItemTableComponent} from "./item-table/item-table.component";
import {InfoViewComponent} from "./info-view/info-view.component";

const routes: Routes = [
	 {path : 'item',     			 component:ItemFormComponent,canActivate: [AuthGuard]},
	 {path : 'item/:id',     	 component:ItemFormComponent,canActivate: [AuthGuard]},
	 {path : 'items',     			 component:ItemTableComponent,canActivate: [AuthGuard]},
   {path : 'home',             component: HomeComponent},
   {path : 'info',             component: InfoViewComponent},
   {path : 'login',            component: LoginComponent},
   {path : 'callback',         component: CallbackComponent},
   {path : 'dashboard',        component: DashboardComponent,canActivate: [AuthGuard]},
   {path : 'docs',             loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule) },
   {path : '**',               redirectTo: '/home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
