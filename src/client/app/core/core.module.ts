import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';


import { throwIfAlreadyLoaded } from './module-import-guard';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [RouterModule],
  declarations: [ ToolbarComponent],
  exports: [RouterModule,
     ToolbarComponent]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
