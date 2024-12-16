import { Component } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IEpisodes } from '../../core/models/IEpisodes';
import { RickAndMortyService } from '../../core/services/moduleServices/rick-and-morty-service.service';
import { HttpParams } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-episodes',
  imports: [AsyncPipe, CommonModule, LoaderComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css',
})
export class EpisodesComponent {
  episodes$: Observable<IEpisodes[]> | undefined;
  currentPage: number = 1;
  totalPages: number = 1;
  errorMessage: string = '';
  constructor(private rickAndMortyService: RickAndMortyService) {}
  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes() {
    const params = new HttpParams().set('pages', '1');
    this.episodes$ = this.rickAndMortyService.getEpisodes(params).pipe(
      map((result: any) => {
        this.totalPages = result.info.pages;
        return result.results;
      }),
      catchError((error) => {
        this.errorMessage =
          'Failed to load characters. Please try again later.';
        console.error('Error occurred:', error);
        return of([]);
      })
    );
  }
}
