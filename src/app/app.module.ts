import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WidgetWrapperComponent } from './widget-framework/components/widget-wrapper/widget-wrapper.component';
import { DecoratedComponentComponent } from './test-widget/decorated-component/decorated-component.component';
import { SettingsViewComponent } from './test-widget/settings-view/settings-view.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetWrapperComponent,
    DecoratedComponentComponent,
    SettingsViewComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  entryComponents: [ DecoratedComponentComponent, SettingsViewComponent ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
