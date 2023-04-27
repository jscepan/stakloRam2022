import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRoutingModule } from '@layouts/auth-layout/auth-routing.module';
import { RouterModule } from '@angular/router';
import { AuthWebService } from './auth.web-service';
import { LogoModule } from 'src/app/shared/components/logo/logo.module';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    TranslateModule,
    LogoModule,
  ],
  providers: [AuthWebService],
})
export class AuthLayoutModule {}
