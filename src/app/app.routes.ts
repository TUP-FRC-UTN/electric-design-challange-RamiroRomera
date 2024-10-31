import { Routes } from '@angular/router';
import {BudgetFormComponent} from './components/budget/budget-form/budget-form.component';
import {BudgetViewComponent} from './components/budget/budget-view/budget-view.component';
import {BudgetListComponent} from './components/budget/budget-list/budget-list.component';

export const routes: Routes = [
  {path: "budget/form", component: BudgetFormComponent},
  {path: "budget/detail/:id", component: BudgetViewComponent},
  {path: "budget/list", component: BudgetListComponent}
];
