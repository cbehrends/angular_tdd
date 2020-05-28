import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IClaim} from '../IClaim';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IServiceType} from '../../service-types/service-type';
import {IRenderedService} from '../IRenderedService';

@Component({
  selector: 'app-claim-editor',
  templateUrl: './claim-editor.component.html',
  styleUrls: ['./claim-editor.component.css']
})
export class ClaimEditorComponent implements OnInit {
  public editForm: FormGroup;
  title: string;
  claim: IClaim;
  serviceList: IServiceType[];

  constructor(public dialogRef: MatDialogRef<ClaimEditorComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: ClaimEditDialogModel) {

    this.title = data.title;
    this.claim = data.claim;
    this.serviceList = data.serviceList;
    this.editForm = this.fb.group({
      firstName: '',
      amountDue: 0.00,
      totalAmount: 0.00
    });
  }

  addRenderedService(service: IServiceType): void {
    if (this.claim.servicesRendered === undefined){
      this.claim.servicesRendered = new Array<IRenderedService>(0);
    }
    this.claim.servicesRendered.push({
      id: -1,
      serviceId: service.id,
      cost: service.cost,
      description: service.description} as IRenderedService);
    this.reCalculateCost();
  }

  private reCalculateCost() {
    let newSum = 0.00;
    this.claim.servicesRendered.forEach(a => newSum = newSum + a.cost);

    this.claim.totalAmount = newSum;
  }

  removeRenderedService(id: number): void {
    this.claim.servicesRendered.splice(
      this.claim.servicesRendered.indexOf(this.claim.servicesRendered.find(s => s.id === id)), 1);

    this.reCalculateCost();
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.editForm.controls.firstName.setValue(this.claim.firstName);
    this.editForm.controls.amountDue.setValue(this.claim.amountDue);
    this.editForm.controls.totalAmount.setValue(this.claim.totalAmount);

  }

  saveForm() {
    this.claim = {...this.claim, firstName: this.editForm.value.firstName};
    this.dialogRef.close(this.claim);
  }
}

export class ClaimEditDialogModel {

  constructor(
    public title: string,
    public claim: IClaim,
    public serviceList: IServiceType[]) {
  }
}
