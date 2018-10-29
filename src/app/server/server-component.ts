import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HerbsService {
  private _url = './assets/categories.json';
  // constructor (private httpService: HttpClient) { }

  // getHerbs() {
  //   return this.httpService.get(this._url)
  //   .pipe(map((response: Response) => response.json()));

  //   // return this.httpService.get(this._url).subscribe(
  //   //   data => {
  //   //     this.arrBirds = data as string [];
  //   //     // console.log(this.arrBirds);
  //   //   },
  //   //   (err: HttpErrorResponse) => {
  //   //     console.log (err.message);
  //   //   }
  //   // );
  // }

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  public getJSON(): Observable <any> {
    return this.http.get(this._url);
  }
}
