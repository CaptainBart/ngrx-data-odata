import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { AirlinesComponent } from './airlines.component';
import { UpdateComponent } from './update.component';
import { AirlineDetailComponent } from './airline-detail.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
  {
    path: '',
    component: AirlinesComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'update/:airlineCode',
    component: UpdateComponent,
  },
];

@NgModule({
  declarations: [AirlinesComponent, UpdateComponent, AirlineDetailComponent, CreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class AirlinesModule { }
