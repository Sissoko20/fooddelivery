import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailsPage } from './details-pizza/details.page';
import { DetailsCakePage } from './details-cake/details-cake.page';
import { DetailsPlatAfricainsPage } from './details-plat-africains/details-plat-africains.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details-pizza/details.module').then( m => m.DetailsPageModule)
  },
  { 
    path:'details/:id',
    component:DetailsPage,
  },

 
  {
    path: 'details-cake',
    loadChildren: () => import('./details-cake/details-cake.module').then( m => m.DetailsCakePageModule)
  },
  { 
    path:'details-cake/:id',
    component:DetailsCakePage,
  },
 
  {
    path: 'details-plat-africains',
    loadChildren: () => import('./details-plat-africains/details-plat-africains.module').then( m => m.DetailsPlatAfricainsPageModule)
  },

  { 
    path:'details-plat-africains/:id',
    component:DetailsPlatAfricainsPage,
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
