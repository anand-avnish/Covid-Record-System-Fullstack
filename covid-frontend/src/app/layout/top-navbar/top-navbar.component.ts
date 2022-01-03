import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

class TabModel {
  constructor(
      public displayName: string,
      public routerPath: string,
      public isActive: boolean
  ){}
}

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  navTabs: TabModel[] = [
    new TabModel('Home', '/home', true),
    new TabModel('Patients', '/patient', false),
    new TabModel('Hospitals', '/hospital', false),
    // new TabModel('Gallery', '/gallery', false),
    // new TabModel('Contact', '/contact', false)
  ];

  parsedURL: any;

  constructor(
    private router:Router,
    private actRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params: Params) => {
      this.parsedURL = this.router.url.split('/');
      console.log(`/${this.parsedURL[1]}`);
    });

    for(let tab of this.navTabs){
      if(tab.routerPath == `/${this.parsedURL[1]}`){
          tab.isActive = true;
      } else {
          tab.isActive = false;
      }
    }
  }

  linkClicked(link: string){
    console.log(link)
    for(let tab of this.navTabs){
        if(tab.routerPath == link){
            tab.isActive = true;
        } else {
            tab.isActive = false;
        }
    }
    this.router.navigate([link]);
  }

}
