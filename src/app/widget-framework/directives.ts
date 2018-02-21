import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";
export function Widget(config) {

    let defaultConfig = { modelProperty : "model",  settingsView : null};
    let finalConfig = Object.assign({}, defaultConfig, config);
  
    return function (target) {
      //console.log(Reflect);
      Reflect.defineMetadata('WidgetConfig', finalConfig, target);
      
    }
}

export function WidgetSettings(config) {

  let defaultConfig = { modelProperty : "model"};
  let finalConfig = Object.assign({}, defaultConfig, config);

  return function (target) {
    //console.log(Reflect);
    Reflect.defineMetadata('WidgetConfig', finalConfig, target);
    
  }
}
