import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserRegistration } from 'src/app/class/customer';
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'bedrijfsNaam', 'kvkNummer', 'phoneNumber', 'name', 'isApprove', 'action'
  ];
  dataSource: UserRegistration[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.customerService.getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((customers: UserRegistration[]) => {
        this.dataSource = customers;
      });
  }

  approveUser(userId: string) {
    this.customerService.approveUser(userId).subscribe(() => {
      this.getAllUsers(); // Refresh list after approval
    });
  }

  rejectUser(userId: string) {
    this.customerService.rejectUser(userId).subscribe(() => {
      this.getAllUsers(); // Refresh list after rejection
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
