import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/security/auth.service";
import { AuthInfo } from "../shared/security/auth-info";
import { Router } from "@angular/router";
import { FirbaseService } from 'app/shared/services/firebase.service';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userState: any;
  email: '';
  authInfo: AuthInfo;
  isHidden: boolean = false;
  isCollapsed: boolean = true;


  constructor(private authService: AuthService, private router: Router, private fbService: FirbaseService, private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService, private media: ObservableMedia) {
    this.email = this.fbService.userStates.email;
    this._ngxZendeskWebwidgetService.identify({
      email: this.email
    })
    this._ngxZendeskWebwidgetService.show()
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
    // this.fbService.userState$.subscribe(x => {
    //   console.log('xxxxxxxxxxxxxxxxxxx', x);
    //   this.userState = x;
    // })

  }

  changeView(text) {

    if (this.media.isActive('xs')) {
      if (text == "travelReport") {
        setTimeout(() => {
          this.isHidden = false;
        }, 500)
        this.router.navigate(['dashboard/travel-report']);
      } else if (text == "redeem") {
        setTimeout(() => {
          this.isHidden = false;
        }, 500)
        this.router.navigate(['dashboard/redeem']);
      } else if (text == "spendingReport") {
        setTimeout(() => {
          this.isHidden = false;
        }, 500)
        this.router.navigate(['dashboard/spending-report']);
      } else if (text == "settings") {
        setTimeout(() => {
          this.isHidden = false;
        }, 500)
        this.router.navigate(['dashboard/settings']);
      } else if (text == "logout") {
        this.logout();
      }
    } else {
      if (text == "travelReport") {
        this.router.navigate(['dashboard/travel-report']);
      } else if (text == "redeem") {
        this.router.navigate(['dashboard/redeem']);
      } else if (text == "spendingReport") {
        this.router.navigate(['dashboard/spending-report']);
      } else if (text == "settings") {
        this.router.navigate(['dashboard/settings']);
      } else if (text == "logout") {
        this.logout();
      }
    }
  }

  logout() {
    this.authService.logout();
  }

}
// export class toggle {
//   isHidden: false;

//   constructor() {
//   }

// }
