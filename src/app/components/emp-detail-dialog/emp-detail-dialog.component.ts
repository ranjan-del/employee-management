import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-emp-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>
        <mat-icon>{{isEditing ? 'edit' : 'person_add'}}</mat-icon>
        {{isEditing ? 'Edit' : 'Add New'}} Employee
      </h2>
      
      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
        <div mat-dialog-content>
          <div class="form-row">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName" required>
              <mat-error *ngIf="employeeForm.get('firstName')?.errors?.['required']">
                First name is required
              </mat-error>
              <mat-error *ngIf="employeeForm.get('firstName')?.errors?.['pattern']">
                Only letters are allowed
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName" required>
              <mat-error *ngIf="employeeForm.get('lastName')?.errors?.['required']">
                Last name is required
              </mat-error>
              <mat-error *ngIf="employeeForm.get('lastName')?.errors?.['pattern']">
                Only letters are allowed
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" required>
            <mat-error *ngIf="employeeForm.get('email')?.errors?.['required']">
              Email is required
            </mat-error>
            <mat-error *ngIf="employeeForm.get('email')?.errors?.['email']">
              Please enter a valid email address
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phoneNumber" required>
            <mat-error *ngIf="employeeForm.get('phoneNumber')?.errors?.['required']">
              Phone number is required
            </mat-error>
            <mat-error *ngIf="employeeForm.get('phoneNumber')?.errors?.['pattern']">
              Please enter a valid phone number (e.g., 1234567890)
            </mat-error>
          </mat-form-field>
        </div>
        
        <div mat-dialog-actions align="end">
          <button mat-button (click)="onCancel()" type="button">
            Cancel
          </button>
          <button 
            mat-raised-button 
            color="primary" 
            type="submit" 
            [disabled]="!employeeForm.valid">
            {{isEditing ? 'Update' : 'Save'}}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 16px;
    }

    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      color: #1976d2;
    }

    .form-row {
      display: flex;
      gap: 16px;
    }

    .form-field {
      flex: 1;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    mat-dialog-actions {
      margin-top: 24px;
      padding: 0;
    }

    button {
      min-width: 120px;
    }
  `]
})
export class EmpDetailDialogComponent {
  employeeForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EmpDetailDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Employee | null
  ) {
    this.isEditing = !!data;
    this.employeeForm = this.fb.group({
      firstName: [
        data?.firstName || '', 
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/)
        ]
      ],
      lastName: [
        data?.lastName || '', 
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/)
        ]
      ],
      email: [
        data?.email || '', 
        [
          Validators.required,
          Validators.email
        ]
      ],
      phoneNumber: [
        data?.phoneNumber || '', 
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}