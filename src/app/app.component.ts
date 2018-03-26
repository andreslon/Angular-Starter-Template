/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit { 

  constructor(
    public appState: AppState,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {

    //Dev
    // sessionStorage.setItem('userToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZGVtb3VzYSIsIm5iZiI6MTUzMzU4NTc4NCwiaWF0IjoxNTE3OTQ3Mzg0LCJleHAiOjE1MTc5OTA1ODQsImlkVXNlciI6IjU5NTIxNjQ2NCIsImNhbGxVcmwiOiIiLCJjbGllbnRJZCI6NTU0MjcsInVzdWFyaW9jcmVhZG9yIjoiIiwicmF6b25zb2NpYWwiOiIzMDA1OTg4Iiwicm9sZXMiOlsib3BlcmFkb3JDb21hbmRvcyIsImFkbWluIl0sImlkUGFpcyI6NSwic3RhdGUiOiJhY3RpdmUiLCJSZWZlcmVuY2lhU2VydmljaW9zIjoiMTAwMDAiLCJSZWZlcmVuY2lhQXBsaWNhY2lvbmVzIjoiIiwiVGltZVpvbmUiOiJBbWVyaWNhL05ld19Zb3JrIiwiTWVhc3VyZSI6Ik1pbGxhcyIsIkhvdXJzRGlmZmVyZW5jZSI6LTV9.BGPmDHnq5X6C0k8JhuDCymqhzamKhWmvWli1NQvEuuA');
    // sessionStorage.setItem('userName', 'demousa');  
    // sessionStorage.setItem('userCountry', '5'); 
    // this.router.navigate(["/vehicles"], { replaceUrl: true });
    // var language = (sessionStorage.getItem('userCountry') == "5") ? "en" : "es";
    // this.translate.setDefaultLang(language);
    //Prod
    if (window.addEventListener) {
      window.addEventListener("message", this.receivedMessage.bind(this), false);
    } else {
      (<any>window).attachEvent("onmessage", this.receivedMessage.bind(this));
    }
  }
  receivedMessage(evt: any): void { 
    if(evt.data.currentUser){ 
      sessionStorage.setItem('userToken', evt.data.currentUser.token);
      sessionStorage.setItem('userName', evt.data.currentUser.username);
      sessionStorage.setItem('userCountry', evt.data.currentUser.idPais);
  
      var language = (sessionStorage.getItem('userCountry') == "5") ? "en" : "es";
      this.translate.setDefaultLang(language);

      this.router.navigate(["/vehicles"], { replaceUrl: true });
      
    } 
  }
  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let lng = params['lng'];
      if (lng) {
        this.translate.setDefaultLang(lng);
      }
    });
  } 
}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
