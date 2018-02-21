import { Component, OnInit , Input, Output} from '@angular/core';
import { WidgetSettings } from '../../widget-framework';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.css']
})
@WidgetSettings({})
export class SettingsViewComponent implements OnInit {

  @Input()
  model : any;

  @Output()
  modelChange : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onAdd(newPort){
    this.model.ports.push(newPort)
    this.modelChange.emit(this.model);
  }
}
