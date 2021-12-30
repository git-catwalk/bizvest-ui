import {Component, HostBinding} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {IconService} from "./services/icon.service";
import {AuthGuard} from "./services/auth.guard";

import {UserProfileService} from "./services/user-profile.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ThemeService} from "./services/theme.service";
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./services/auth.config";
import {AuthService} from "./services/auth.service";
import {SaasyService, Tenant} from "./services/saasy-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  data:any | null = null;
  isDarkMode:boolean;
  tenants:Array<Tenant> =[];

  @HostBinding('class') className = '';
  toggleControl = new FormControl(true);
  theme = new BehaviorSubject("dark-theme");

  constructor(public saasyService:SaasyService,private oauthService: OAuthService,private authService:AuthService,private iconService:IconService,private themeService:ThemeService,private authGuard:AuthGuard,  private userProfileService : UserProfileService, private overlay: OverlayContainer) {
    this.iconService.registerIcons();
    themeService.initTheme();
    this.isDarkMode = themeService.isDarkMode();
    this.oauthService.configure(authConfig);
    this.authService.runInitialLoginSequence().then(u=>{
      this.data = u;
    });

  }

  ngOnInit(): void {
    this.authGuard.listenForActivateUser().subscribe(u=>{
      console.log(u);
      this.data = u;
    });
    this.saasyService.listTenants().subscribe(t=>{
      this.tenants = t;
    })
  }

  onLogout($event: MouseEvent) {
    this.authService.logout();
  }

  toggleDarkMode() {
    this.isDarkMode ? this.themeService.update('light-mode') : this.themeService.update('dark-mode');
  }

  isLoggedIn() {
    return this.authService.hasValidToken();
  }


  getTenant():Observable<string> {
    return new Observable<string>(observer=>{
      this.saasyService.getTenant().subscribe(t=>{
         if(t.name){
           observer.next(t.name);
         }
      });
    });
  }

  setTenant(tenant: Tenant) {
    this.saasyService.setTenant(tenant);
  }

  login() {
    this.authService.login('/dashboard');
  }
}
