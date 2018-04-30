import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RestProvider } from '../providers/rest/rest';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  token:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      storage.get('token').then((val)  => {
        this.token = val;

        if(this.token != null){
          console.log('token existed');
          this.restProvider.setToken(val); //storage ni slow, so kita hantar kat restProvider yang jenis variable yang laju
          this.rootPage = TabsPage; //

        }

        else{

          console.log('token not exist');
          this.rootPage = LoginPage;

        }

        statusBar.styleDefault();
        splashScreen.hide(); 
      });
    });
  }
}

