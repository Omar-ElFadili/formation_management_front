import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Formation } from '../models/formation.model';
import { Adherent } from '../models/adherent.model';


@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  private apiUrl = 'http://localhost:8080/formations';
  
  
  constructor(private http : HttpClient) { }

  getAdherent(id: number): Observable<Adherent[]> {
    return this.http.get<Adherent[]>(`${this.apiUrl}/${id}/adherent`).pipe(
      catchError(this.handleError)
    );
  }

  getAdherentById(id1: number, id2: number): Observable<Adherent> {
    return this.http.get<Adherent>(`${this.apiUrl}/${id1}/adherent/${id2}`);
  }
  
  addAdherent(id : number,adherent: Adherent): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/${id}/adherent`, adherent, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateAdherent(id1: number, id2: number, adherent: Adherent): Observable<any> {
    const url = `${this.apiUrl}/${id1}/adherent/${id2}`;
    return this.http.put<Adherent>(url, adherent, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteAdherent(id1: number, id2: number): Observable<any> {
    const url = `${this.apiUrl}/${id1}/adherent/${id2}`;
    return this.http.delete<any>(url, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Méthode privée pour définir les options HTTP (headers, etc.)
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  //ctte Méthode privée pour gérer les erreurs de requête HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
