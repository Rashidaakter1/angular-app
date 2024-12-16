import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../../models/IResponse';
import { ICharacter } from '../../models/ICharacter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}
  getCharacters(params: any): Observable<IResponse> {
    return this.http.get<IResponse>(
      'https://rickandmortyapi.com/api/character',
      {
        params,
      }
    );
  }
  getEpisodes(params: any): Observable<IResponse> {
    return this.http.get<IResponse>('https://rickandmortyapi.com/api/episode', {
      params,
    });
  }
}
