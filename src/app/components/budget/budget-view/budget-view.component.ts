import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BudgetService} from '../../../services/budget.service';
import {ModuleType} from '../../../models/budget';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
})
export class BudgetViewComponent {
  // ADDITIONAL DOCS: same as BudgetListComponent
  private activatedRoute = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);

  id: string = ""
  slotsQuantity: number = 0
  boxsQuantity: number = 0

  modulesOfLiving: any[] = []
  modulesOfKitchen: any[] = []
  modulesOfRoom: any[] = []
  modulesOfComedor: any[] = []

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.setValues()
  }

  setValues() {
    if (this.id) {
      this.budgetService.getBudgetById(this.id).subscribe({
        next: result => {
          for (let module of result.budget.modules) {
            console.log(module);
            switch (module.ambient) {
              case "Cocina":
                this.slotsQuantity += module.moduleType.slots;
                this.modulesOfKitchen.push(module);
                break;
              case "Living":
                this.slotsQuantity += module.moduleType.slots;
                this.modulesOfLiving.push(module);
                break;
              case "Dormitorio":
                this.slotsQuantity += module.moduleType.slots;
                this.modulesOfRoom.push(module);
                break;
              case "Comedor":
                this.slotsQuantity += module.moduleType.slots;
                this.modulesOfComedor.push(module)
                break;
            }
          }
          this.calculateBoxQuantity()
        }
      })
    }
  }

  calculateBoxQuantity() {
    let boxes = this.slotsQuantity / 3;
    this.boxsQuantity = Math.ceil(boxes)
  }
}
