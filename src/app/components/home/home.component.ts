import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="home-container">
      <mat-card class="main-card">
        <mat-card-header>
          <mat-card-title>Employee Management System</mat-card-title>
          <mat-card-subtitle>Manage your organization's workforce efficiently</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="search-container">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search Employees</mat-label>
              <input 
                matInput 
                [(ngModel)]="searchText" 
                (keyup)="applyFilter()"
                placeholder="Search by name, email or phone">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
            
            <button 
              mat-raised-button 
              color="primary" 
              (click)="openAddEmployeeDialog()"
              class="add-button" id="add-btn" >
              <mat-icon>add</mat-icon>
              Add Employee
            </button>
          </div>

          <div class="table-container mat-elevation-z8">
            <table mat-table [dataSource]="filteredEmployees">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let employee">{{employee.id}}</td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Name</th>
                <td mat-cell *matCellDef="let employee">
                  {{employee.firstName}} {{employee.lastName}}
                </td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef>Email</th>
                <td mat-cell *matCellDef="let employee">{{employee.email}}</td>
              </ng-container>

              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef>Phone</th>
                <td mat-cell *matCellDef="let employee">{{employee.phoneNumber}}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let employee">
                  <button 
                    mat-icon-button 
                    color="primary" 
                    (click)="editEmployee(employee)"
                    matTooltip="Edit Employee">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button 
                    mat-icon-button 
                    color="warn" 
                    (click)="deleteEmployee(employee.id)"
                    matTooltip="Delete Employee">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <div *ngIf="filteredEmployees.length === 0" class="no-data">
              <mat-icon>sentiment_dissatisfied</mat-icon>
              <p>No employees found</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
  #add-btn {
      margin-bottom: 20px;
      }

    .main-card {
      margin-top: 20px;
      border-radius: 12px;
    }

    .search-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 16px;
    }

    .search-field {
      flex: 1;
    }

    .add-button {
      height: 56px;
      padding: 0 24px;
    }

    .table-container {
      border-radius: 8px;
      overflow: hidden;
    }

    table {
      width: 100%;
    }

    .mat-column-actions {
      width: 120px;
      text-align: center;
    }

    .mat-column-id {
      width: 80px;
    }

    th.mat-header-cell {
      background: #f5f5f5;
      color: rgba(0, 0, 0, 0.87);
      font-weight: 600;
      padding: 16px;
    }

    td.mat-cell {
      padding: 16px;
    }

    tr.mat-row:hover {
      background: #f5f5f5;
    }

    .no-data {
      padding: 48px;
      text-align: center;
      color: #666;
    }

    .no-data mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }
  `]
})


export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  searchText: string = '';

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (!this.searchText) {
      this.filteredEmployees = this.employees;
      return;
    }

    const searchTerm = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee => 
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.phoneNumber.toLowerCase().includes(searchTerm)
    );
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe(() => {
          this.loadEmployees();
        });
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '500px',
      data: employee,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedEmployee = { ...employee, ...result };
        this.employeeService.updateEmployee(updatedEmployee).subscribe(() => {
          this.loadEmployees();
        });
      }
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }
}