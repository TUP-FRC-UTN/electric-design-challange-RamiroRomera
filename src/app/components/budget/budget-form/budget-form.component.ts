import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../../common/navbar/navbar.component';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModuleType, Zone} from '../../../models/budget';
import {CommonModule, Location} from '@angular/common';
import {BudgetService} from '../../../services/budget.service';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
  providers: [BudgetService]
})
export class BudgetFormComponent {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */
  private location = inject(Location)
  private budgetService = inject(BudgetService)

  ambients:any[] = [Zone.COMEDOR, Zone.KITCHEN, Zone.LIVING, Zone.ROOM];
  modulesTypes:ModuleType[] = []

  budgetForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    modules: new FormArray([])
  })

  moduleForm: FormGroup = new FormGroup({
    moduleType: new FormControl('', Validators.required),
    ambient: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    places: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.addModule()
    console.log(this.budgetService.getAllModules())
    this.budgetService.getAllModules().subscribe({
      next: (data) => this.modulesTypes = data,
      error: (error) => console.log(error)
    })
  }

  get modules() {
    return this.budgetForm.controls['modules'] as FormArray;
  }

  addModule() {
    const newModuleForm = new FormGroup({
      moduleType: new FormControl('', Validators.required),
      ambient: new FormControl('', Validators.required),
      price: new FormControl({ value: '', disabled: true }, Validators.required),
      places: new FormControl({ value: '', disabled: true }, Validators.required),
    });

    this.modules.push(newModuleForm);

    newModuleForm.get('moduleType')?.valueChanges.subscribe(value => {
      this.moduleTypeChanged(this.modules.length - 1);
    });
  }

  moduleTypeChanged(index: number) {
    const moduleControl = this.modules.at(index);
    const selectedType = moduleControl.get('moduleType')?.value;
    const price = moduleControl.get('price');
    const slots = moduleControl.get('places');

    for (let module of this.modulesTypes) {
      if (module.id === selectedType.id) {
        price?.setValue(module.price);
        slots?.setValue(module.slots);
        break;
      }
    }
  }

  removeModule(index: number) {
    this.modules.removeAt(index)
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      console.log(this.budgetForm.value)
      this.budgetService.createBudget(this.budgetForm.value).subscribe({
        next: () => {this.goBack()},
        error: (error) => {console.log(error)}
      })
    }
  }
}
