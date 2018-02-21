import { Component, OnInit, Input } from '@angular/core';
import { Widget} from '../../widget-framework';
import { SettingsViewComponent} from '../settings-view/settings-view.component';
@Component({
  selector: 'app-decorated-component',
  templateUrl: './decorated-component.component.html',
  styleUrls: ['./decorated-component.component.css']
})
@Widget({
  settingsView : SettingsViewComponent
})
export class DecoratedComponentComponent implements OnInit {

  @Input()
  model : any;

  constructor() {

    //console.log("in constructor.")
   }

  ngOnInit() {
  }

}





