import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Formation } from '../models/formation.model';


@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8080/api/formation';
  
  
  constructor(private http : HttpClient) { }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }
  
  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formation, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateFormation(id: number, formation: Formation): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Formation>(url, formation, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteFormation(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
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
