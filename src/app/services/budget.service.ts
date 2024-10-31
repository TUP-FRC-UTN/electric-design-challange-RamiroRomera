import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Budget, ModuleType} from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private http = inject(HttpClient)

  url = "http://localhost:3000";

  getAllModules() {
    return this.http.get<ModuleType[]>(`${this.url}/module-types`)
  }

  createBudget(budget: any) {
    return this.http.post(`${this.url}/budgets`, {budget})
  }

  getAllBudgets() {
    return this.http.get<Budget[]>(`${this.url}/budgets`)
  }

  getBudgetById(id: string) {
    return this.http.get<any>(`${this.url}/budgets/${id}`)
  }
}
