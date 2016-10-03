import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';

//Pages
import {AwgTestPage} from '../../pages/instrument-test-pages/awg-test/awg-test';
import {DcTestPage} from '../../pages/instrument-test-pages/dc-test/dc-test';
import {OscTestPage} from '../../pages/instrument-test-pages/osc-test/osc-test';


//Services
import {DeviceManagerService} from '../../services/device/device-manager.service';
import {StorageService} from '../../services/storage/storage.service';

@Component({
    templateUrl: 'settings.html',
})
export class SettingsPage {

    public nav: NavController;
    public toastCtrl: ToastController;

    public deviceManangerService: DeviceManagerService;   
    public localSimDevUri = 'http://192.168.1.8:80';
    public remotesimDevUri = 'https://35oopc6de8.execute-api.us-west-2.amazonaws.com/dev';
    public storageService: StorageService;
    public showExtraInfo: boolean = false;

    constructor(_toastCtrl: ToastController, _nav: NavController, _deviceManagerService: DeviceManagerService, _storageService: StorageService) {
        this.nav = _nav;
        this.toastCtrl = _toastCtrl;
        this.deviceManangerService = _deviceManagerService;
        this.storageService = _storageService;
        console.log('settings constructor');
        this.storageService.getData('uri').then((uri) => {
            this.localSimDevUri = uri;
        });
    }

    connect(targetUri: string) {
        this.deviceManangerService.connect(targetUri).subscribe(
            (data) => {
                this.deviceManangerService.addDeviceFromDescriptor(targetUri, data);                

            },
            (err) => {
                let toast = this.toastCtrl.create({
                    message: 'No response from URL',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            },
            () => {

            }
        );
    }

    //Test Code
    enumDc() {
        /*this.deviceManangerService.devices[0].instruments.dc.enumerate().subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            },
            () => { }
        )*/
    }

    showInfo() {
        this.showExtraInfo = !this.showExtraInfo;
    }
    
    navToAwgTestPage(deviceIndex: number){
        this.deviceManangerService.setActiveDevice(deviceIndex);
        this.nav.push(AwgTestPage);
    }
    
    navToDcTestPage(deviceIndex: number) {
        this.deviceManangerService.setActiveDevice(deviceIndex);
        this.nav.push(DcTestPage);
    }
    
    navToOscTestPage(deviceIndex: number){
        this.deviceManangerService.setActiveDevice(deviceIndex);
        this.nav.push(OscTestPage);
    }

    sqlSave() {
        this.storageService.saveSettings();
    }

    sqlLoad() {
        this.storageService.loadSettings();
    }

    onUrlInputChange(data) {
        //Store value in local storage to load on next init
        this.storageService.saveData('uri', data);
    }
}