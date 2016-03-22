import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { GithubService } from './github.service';

@Component({
  selector: 'landing',
  templateUrl: 'app/landing.component.html',
  styleUrls: ['app/landing.component.css']
})
export class LandingComponent {
  constructor(private _router: Router) { }

  public goToProfile(githubUsername) {
    let link = ['Profile', { username: githubUsername }];
    this._router.navigate(link);
  }
}
