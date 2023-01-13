import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DependencyComponent } from './views/dependency/dependency.component';
import { TicketListComponent } from './views/ticket-list/ticket-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dependency' },
  { path: 'dependency', component: DependencyComponent},
  { path: 'table', component: TicketListComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
