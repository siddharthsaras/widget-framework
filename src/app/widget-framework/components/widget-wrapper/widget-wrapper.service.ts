import { Injectable, EventEmitter } from '@angular/core';
import { ComponentFactoryResolver, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
@Injectable()
export class WidgetWrapperLayoutService {

    //layout state
    private activeView: string = "primary";
    private minimized: boolean = false;
    private loading: boolean = false;
    private primaryViewLoaded: boolean = false;
    private secondaryViewLoaded: boolean = false;

    //view containers
    private primaryContainer: ViewContainerRef; 
    private secondaryContainer: ViewContainerRef;

    //components
    private primaryComponent: any;
    private secondaryComponent: any;

    //Misc
    private componentFactoryResolver: ComponentFactoryResolver;
    private changeDetectorRef: ChangeDetectorRef;
    private ready : boolean;

    //Model
    private widgetModel : any;
    private widgetModelChange : EventEmitter<any>;

    init(componentFactoryResolver: ComponentFactoryResolver,
        changeDetectorRef: ChangeDetectorRef) {
        if(this.ready) { throw "Service already Initialized";}
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;            
    }

    initPrimaryView(primaryContainer: ViewContainerRef, primaryComponent: any){
        if(this.ready) { throw "Service already Initialized";}
        this.primaryContainer = primaryContainer;
        this.primaryComponent = primaryComponent;
    }

    initSecondaryView(secondaryContainer: ViewContainerRef, secondaryComponent: any){
        if(this.ready) { throw "Service already Initialized";}
        this.secondaryContainer = secondaryContainer;
        this.secondaryComponent = secondaryComponent;
    }

    initModel(widgetModel : any, widgetModelChange : EventEmitter<any>){
        if(this.ready) { throw "Service already Initialized";}
        this.widgetModel = widgetModel;
        this.widgetModelChange = widgetModelChange;
    }
    public markReady(){
        this.ready = true;
    }
    public showSecondaryView(forceReload?: boolean) {
        if (this.secondaryComponent) {
            this.activeView = "secondary";
            if (!this.secondaryViewLoaded || forceReload) {
                const config = Reflect.getMetadata("WidgetConfig", this.secondaryComponent);
                if (!config) {
                    throw "[" + this.secondaryComponent.name + "] is not a settings view for a widget. It probably does not have @WidgetSettings decorator.";
                }
                
                let factory = this.componentFactoryResolver.resolveComponentFactory(this.secondaryComponent);
                //create a component
                this.secondaryContainer.clear();
                let componentRef = this.secondaryContainer.createComponent(factory);
                //set model from property
                Reflect.set(componentRef.instance, config.modelProperty, this.widgetModel);
                //set event listener
                let eventEmitter = Reflect.get(componentRef.instance, config.modelProperty+"Change");
                if(eventEmitter){
                    eventEmitter.subscribe(() => {
                        console.log("Settings View Changed Model");
                        this.widgetModelChange.emit(this.widgetModel)});
                }
                this.secondaryViewLoaded = true;
                this.changeDetectorRef.detectChanges();
            }
        }
        else{
            throw "Secondary View Not Set";
        }
    }
    
    public showPrimaryView(forceReload?: boolean) {
        if (this.primaryComponent) {
            this.activeView = "primary";
            if (!this.primaryViewLoaded || forceReload) {
                const config = Reflect.getMetadata("WidgetConfig", this.primaryComponent);
                if (!config) {
                    throw "[" + this.primaryComponent.name + "] is not a primary view for a widget. It probably does not have @Widget decorator.";
                }
                
                let factory = this.componentFactoryResolver.resolveComponentFactory(this.primaryComponent);
                //create a component
                this.primaryContainer.clear();
                let componentRef = this.primaryContainer.createComponent(factory);
                //set model from property
                Reflect.set(componentRef.instance, config.modelProperty, this.widgetModel);
                //set event listener
                let eventEmitter = Reflect.get(componentRef.instance, config.modelProperty+"Change");
                if(eventEmitter){
                    eventEmitter.subscribe(() => {
                        console.log("Settings View Changed Model");
                        this.widgetModelChange.emit(this.widgetModel)});
                }
                this.primaryViewLoaded = true;
                this.changeDetectorRef.detectChanges();
            }
        }
        else{
            throw "Primary View Not Set";
        }
    }

    public maximize() {
        this.minimized = false;
    }

    public minimize() {
        this.minimized = true;
    }

    public getActiveView(): string {
        return this.activeView
    }

    public isMinimized(): boolean {
        return this.minimized;
    }

    public isLoading() : boolean{
        return this.loading;
    }

    public hasSecondaryView(){
        return this.secondaryComponent ? true : false;
    }

}