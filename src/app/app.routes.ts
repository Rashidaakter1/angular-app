import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: CharactersComponent,
  },
  {
    path: 'characters',
    title: 'Characters',
    component: CharactersComponent,
  },
  {
    path: 'episodes',
    title: 'Episodes',
    component: EpisodesComponent,
  },
  {
    path: 'about',
    title: 'About',
    component: EpisodesComponent,
  },
  {
    path: '**',
    title: '404-Page not found', 
    component: EpisodesComponent,
  },
];
