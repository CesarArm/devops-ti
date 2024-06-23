import { Injectable, inject } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HomeResponse } from '../interface/home-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = environment.baseUrl;
  private token = environment.token;

  constructor() { }

  httpClient = inject(HttpClient);

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error '+error.error);
    }else{
      console.error('La api retorno un error '+error.message);
    }return throwError(() => error);
  }

  searchDocument(document: string): Observable<HomeResponse> {
    return this.httpClient.get<HomeResponse>(`${this.url+document+this.token}`)
      .pipe(catchError(this.handleError));
  }
}
