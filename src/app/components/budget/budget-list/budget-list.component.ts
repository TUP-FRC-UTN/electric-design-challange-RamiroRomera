import {Component, inject} from '@angular/core';
import {Budget} from '../../../models/budget';
import {BudgetService} from '../../../services/budget.service';
import {Router} from '@angular/router';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/components/lifecycle#
    - https://angular.dev/guide/http/making-requests#http-observables
    - https://angular.dev/guide/http/setup#providing-httpclient-through-dependency-injection
    - https://angular.dev/guide/http/making-requests#setting-request-headers
    - https://angular.dev/guide/http/making-requests#handling-request-failure
    - https://angular.dev/guide/http/making-requests#best-practices (async pipe)
    - https://angular.dev/guide/testing/components-scenarios#example-17 (async pipe)
  */
  private budgetService = inject(BudgetService);
  private router = inject(Router)

  budgets: any[] = []

  ngOnInit(): void {
    this.budgetService.getAllBudgets().subscribe({
      next: result => {
        this.budgets = result;
      },
      error: error => console.log(error)
    });
  }

  viewDetail(id: number) {
    this.router.navigate([`/budget/detail/${id}`])
  }
}
