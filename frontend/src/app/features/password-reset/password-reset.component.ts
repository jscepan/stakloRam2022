import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { UserWebService } from 'src/app/web-services/user.web-service';

export interface DialogData {
  oid: string;
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [UserWebService],
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  formGroup!: FormGroup;
  userOID!: string;

  constructor(
    private dialogRef: MatDialogRef<PasswordResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private webService: UserWebService
  ) {}

  ngOnInit(): void {
    this.userOID = this.data.oid;
    this.formGroup = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  handleSubmitButton(): void {
    this.subs.sink = this.webService
      .resetUserPassword(this.userOID, this.formGroup.value)
      .subscribe((isReseted) => {
        this.dialogRef.close(isReseted);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
