import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  testModel = {ports : [123, 456, 789], orderBy : "tradeDate"}
  newPort : any;
  @ViewChild("widget") widgetComponent;
  constructor(private ref: ChangeDetectorRef){

  }

  ngAfterViewInit(){
    

  }

  onModelChange(){
    console.log("Model Changed" );
    console.log(this.testModel);
  }
}
