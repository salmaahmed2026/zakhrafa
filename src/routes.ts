import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    title: 'زخرفة النصوص والأسماء | زخرفة بالعربي والانجليزي'
  },
  {
    path: 'names/:lang',
    loadComponent: () => import('./components/names-list/names-list.component').then(m => m.NamesListComponent),
    title: 'قائمة الأسماء المزخرفة'
  },
  {
    path: 'names',
    redirectTo: 'names/ar',
    pathMatch: 'full'
  },
  {
    path: 'words/:lang',
    loadComponent: () => import('./components/words-list/words-list.component').then(m => m.WordsListComponent),
    title: 'قائمة الكلمات المزخرفة'
  },
  {
    path: 'words',
    redirectTo: 'words/ar',
    pathMatch: 'full'
  },
  {
    path: 'name/:lang/:name',
    loadComponent: () => import('./components/name-detail/name-detail.component').then(m => m.NameDetailComponent)
  },
  {
    path: 'word/:lang/:word',
    loadComponent: () => import('./components/word-detail/word-detail.component').then(m => m.WordDetailComponent)
  },
  { path: '**', redirectTo: '' }
];