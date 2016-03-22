import { Injectable } from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class GithubService {
  constructor(private http: Http) {}

  public getRepositories(githubUsername) {
    return this.http.get(this.getRepositoriesUrl(githubUsername))
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  public getRepositoryLanguages(githubUsername, repository) {
    return this.http.get(this.getRepositoryLanguagesUrl(githubUsername, repository))
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  public getUserInformation(githubUsername) {
    return this.http.get(this.getUserInformationUrl(githubUsername))
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
    return Promise.reject(error.message || error.json().error || 'Server error');
  }

  private getRepositoriesUrl(githubUsername) {
    return `https://api.github.com/users/${githubUsername}/repos?per_page=100`;
  }

  private getRepositoryLanguagesUrl(githubUsername, repository) {
    return `https://api.github.com/repos/${githubUsername}/${repository}/languages`;
  }

  private getUserInformationUrl(githubUsername) {
    return `https://api.github.com/users/${githubUsername}`;
  }
}
