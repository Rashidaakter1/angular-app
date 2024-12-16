import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../core/services/moduleServices/rick-and-morty-service.service';
import { ICharacter } from '../../core/models/ICharacter';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent implements OnInit {
  characters$: Observable<ICharacter[]> | undefined;

  constructor(private rickAndMortyService: RickAndMortyService) {}
  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    const params = new HttpParams().set('pages', '1');
    this.characters$ = this.rickAndMortyService
      .getCharacters(params)
      .pipe(map((result: any) => result.results));
  }
}
