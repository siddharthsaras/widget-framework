import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, ComponentFactoryResolver, ChangeDetectorRef} from '@angular/core';
import { WidgetWrapperLayoutService} from './widget-wrapper.service';
@Component({
  selector: 'widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.css'],
  providers : [WidgetWrapperLayoutService]
})
export class WidgetWrapperComponent implements OnInit {

  @Input()
  widgetId : string;
  @Input()
  title : string;
  @Output()
  titleChange : EventEmitter<string> = new EventEmitter<string>();
  @Input()
  widgetModel : any;
  @Output()
  widgetModelChange : EventEmitter<any> = new EventEmitter<any>();
  @Input()
  widget : string;

  @ViewChild("primary" , {read : ViewContainerRef})
  widgetContainer : ViewContainerRef;
  @ViewChild("secondary" , {read : ViewContainerRef})
  secondaryContainer : ViewContainerRef;

  private secondaryViewComponent : any;
  private previousWidgetModel : any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
    private changeDetectorRef: ChangeDetectorRef,
    private layoutService : WidgetWrapperLayoutService) { 
    layoutService.init(componentFactoryResolver, changeDetectorRef);
  }


  ngAfterViewInit(){
    if(this.widget){
      let primaryComponent = this.getComponentType(this.widget, this.componentFactoryResolver);
      this.layoutService.initPrimaryView(this.widgetContainer, primaryComponent);
      const config = Reflect.getMetadata("WidgetConfig", primaryComponent);
      this.layoutService.initSecondaryView(this.secondaryContainer, config.settingsView);
      this.layoutService.initModel(this.widgetModel, this.widgetModelChange);
      this.layoutService.showPrimaryView(true);
    }
  }


  getComponentType(componentName : string, componentFactoryResolver: ComponentFactoryResolver){
    //this.componentFactoryResolver.resolveComponentFactory("");
    let retVal ;
    let factories  = Reflect.get(this.componentFactoryResolver, "_factories");
    factories.forEach((value, key) => {
      
      if(key.name == componentName){
      retVal = key;
    }
    
    });
    console.log(retVal);
    return retVal;  
  
  }
  ngOnInit() {
    
  }
  

}
