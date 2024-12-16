import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEpisodes } from '../../core/models/IEpisodes';
import { RickAndMortyService } from '../../core/services/moduleServices/rick-and-morty-service.service';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episodes',
  imports: [CommonModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css',
})
export class EpisodesComponent {
  episodes$: Observable<IEpisodes[]> | undefined;

  constructor(private rickAndMortyService: RickAndMortyService) {}
  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes() {
    const params = new HttpParams().set('pages', '1');
    this.episodes$ = this.rickAndMortyService
      .getEpisodes(params)
      .pipe(map((result: any) => result.results));
  }
}
