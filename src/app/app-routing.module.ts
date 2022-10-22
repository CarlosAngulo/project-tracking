import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependencyComponent } from './views/dependency/dependency.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dependency' },
  { path: 'dependency', component: DependencyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
