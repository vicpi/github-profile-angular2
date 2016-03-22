import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {GithubService} from './github.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/repositories.component.html',
  styleUrls: ['app/repositories.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class RepositoriesComponent implements OnInit {
  public repositories: any[] = [];
  public languages: any[] = [];
  public githubName: string = '';
  public username: string = '';
  public repositoryLanguages: any = {};

  constructor(
    private _githubService: GithubService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {
    let githubUsername = this._routeParams.get('username');
    this.githubName = githubUsername;
    this.getUsername(githubUsername);
    this.getRepositories(githubUsername);
  }

  getRepositories(githubUsername) {
    this._githubService.getRepositories(githubUsername)
      .then(
          repositories => {
            return repositories;
          })
      .then((repositories) => {
        repositories.forEach((repository) => {
          this._githubService.getRepositoryLanguages(githubUsername, repository.name)
            .then(languages => {
              for (let language in languages) {
                const languageLines = languages[language];
                if (this.languages.indexOf(language) === -1) {
                  this.languages.push(language);
                }
              }
              this.repositories.push({
                name: repository.name,
                languages: Object.keys(languages).join(', ')
              });
            });
        });
      })
      .catch(error =>  console.log(error));
  }

  getUsername(githubUsername) {
    this._githubService.getUserInformation(githubUsername)
      .then((userInformation) => {
        this.username = userInformation.name;
      });
  }
}
