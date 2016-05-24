import {Component, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

//Components
import {DigitalIoComponent} from '../digital-io/digital-io.component';
import {DcSupplyComponent} from '../dc-supply/dc-supply.component';

@Component({
    selector: 'bottom-bar',
    templateUrl: 'build/components/bottom-bar/bottom-bar.html',
    directives: [DigitalIoComponent, DcSupplyComponent]
})
export class BottomBarComponent {
    @Output() headerClicked: EventEmitter<any> = new EventEmitter;
    public contentHidden: boolean;
    
    constructor() {
        this.contentHidden = true;
    }

    holy() {
        this.contentHidden = !this.contentHidden;
        this.headerClicked.emit(null);  
    }
}