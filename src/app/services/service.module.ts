import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Config} from "./config";
import {UserProfileService} from "./user-profile.service";
import {ThemeService} from "./theme.service";
import {ItemService} from "./item.service";
import {SaasyService} from "./saasy-service";

@NgModule({
  providers: [
    UserProfileService,
    ThemeService,
		ItemService,
    SaasyService,
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule {
  public static forRoot(environment: any): Config{
    return new Config(environment);
  }
}
