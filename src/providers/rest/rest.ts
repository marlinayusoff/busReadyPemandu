import { Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { App,LoadingController, AlertController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { LoginPage } from '../../pages/login/login';
import { TabsPage } from '../../pages/tabs/tabs';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  loading: Loading;
  token:any;
  data:any = {};
  apiUrl = 'http://busreadyfyp1718.000webhostapp.com/api';
	//apiUrl = 'http://busreadyfyp1718.000webhostapp.com/api';
  //apiUrl = 'http://localhost:8000/api';

  constructor(
		public app: App,
		public http: Http,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private storage: Storage) {
    	console.log('Hello RestProvider Provider');
  }

  showLoading(title) {
		this.loading = this.loadingCtrl.create({
			content: title,
			dismissOnPageChange: true
			});
		this.loading.present();
	}

  	presentAlert(title,subTitle) {
	let alert = this.alertCtrl.create({
			title: title,
			subTitle: subTitle,
			buttons: ['Dismiss']
		})
		alert.present();
	}

	setToken(token){
        this.token = token;
	}


	login(loginData){
		this.showLoading('sabaq naa')
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl+'/loginParents', loginData)
			.toPromise()
			.then((response) =>
			{
				console.log('API Response : ', response.json());
				resolve(response.json());
				this.storage.set('token', 'Bearer '+response.json().token);
				this.app.getActiveNav().setRoot(TabsPage);
			})
			.catch((error) =>
			{
				console.error('API Error : ', error.status);
				console.error('API Error : ', error.json());
				this.loading.dismiss();
				this.presentAlert('Problemo', error.json().message);
			});
		});
  }

}
