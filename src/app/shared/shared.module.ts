import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ModalComponent } from './modal/modal.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),],
  declarations: [
    ToolbarComponent,
    ModalComponent
  ],
  exports: [
    ToolbarComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    RouterModule]
})
export class SharedModule {

}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
