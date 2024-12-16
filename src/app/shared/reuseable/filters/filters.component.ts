import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Input()
  searchTerm: string = '';

  @Output()
  searchChange: EventEmitter<any> = new EventEmitter();

  handleSearchChange = () => {
    this.searchChange.emit(this.searchTerm);
  };
}
