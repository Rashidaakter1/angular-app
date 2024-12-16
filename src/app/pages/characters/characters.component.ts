import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../core/services/moduleServices/rick-and-morty-service.service';
import { ICharacter } from '../../core/models/ICharacter';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PaginationComponent } from '../../shared/reuseable/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/reuseable/filters/filters.component';

@Component({
  selector: 'app-characters',
  imports: [
    AsyncPipe,
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    FormsModule,
    FiltersComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent implements OnInit {
  characters$: Observable<ICharacter[]> | undefined;
  currentPage: number = 1;
  selectedStatus: string = '';
  totalPages: number = 1;
  errorMessage: string = '';
  statusOptions: string[] = ['Alive', 'Dead', 'Unknown'];
  searchTerm: string = '';
  constructor(private rickAndMortyService: RickAndMortyService) {}
  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter() {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('status', this.selectedStatus.toLowerCase())
      .set('name', this.searchTerm.toLocaleLowerCase());
    this.characters$ = this.rickAndMortyService.getCharacters(params).pipe(
      map((result: any) => {
        this.totalPages = result.info.pages;
        // console.log(result.results);
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

  handlePagination(page: any) {
    this.currentPage = page;
    this.getCharacter();
    // console.log(page);
  }
  handleStatusChange() {
    this.getCharacter();
  }
  handleSearchChange(value: string) {
    this.searchTerm = value;
    this.getCharacter();
    console.log(value);
  }
}
