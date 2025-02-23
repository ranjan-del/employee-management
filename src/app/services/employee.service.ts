import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Employee } from '../models/employee.interface';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  DocumentData
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly collectionName = 'employees';

  constructor(private firestore: Firestore) {}

  getEmployees(): Observable<Employee[]> {
    const employeesCollection = collection(this.firestore, this.collectionName);
    return collectionData(employeesCollection, { idField: 'id' }) as Observable<Employee[]>;
  }

  addEmployee(employeeData: Partial<Employee>): Observable<Employee> {
    const employeesCollection = collection(this.firestore, this.collectionName);
    const newEmployee = {
      ...employeeData,
      hireDate: new Date()
    };
    
    return from(addDoc(employeesCollection, newEmployee)).pipe(
      map(docRef => ({
        id: docRef.id,
        ...newEmployee
      } as Employee))
    );
  }

  updateEmployee(employee: Employee): Observable<void> {
    const docRef = doc(this.firestore, this.collectionName, employee.id.toString());
    const { id, ...updateData } = employee;
    return from(updateDoc(docRef, updateData));
  }

  deleteEmployee(id: string): Observable<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return from(deleteDoc(docRef));
  }
}