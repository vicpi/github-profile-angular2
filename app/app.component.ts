import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {RepositoriesComponent} from './repositories.component';
import {LandingComponent} from './landing.component';
import {GithubService} from './github.service';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [GithubService, ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@RouteConfig([
  { path: '/', name: 'Landing', component: LandingComponent, useAsDefault: true },
  { path: '/profile/:username', name: 'Profile', component: RepositoriesComponent },
])
export class AppComponent {
  public title = 'Github Profile Analyzer';
}
