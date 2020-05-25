import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IClaim} from '../IClaim';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-claim-editor',
  templateUrl: './claim-editor.component.html',
  styleUrls: ['./claim-editor.component.css']
})
export class ClaimEditorComponent implements OnInit {
  public editForm: FormGroup;
  title: string;
  claim: IClaim;

  constructor(public dialogRef: MatDialogRef<ClaimEditorComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: ClaimEditDialogModel) {

    this.title = data.title;
    this.claim = data.claim;

    this.editForm = this.fb.group({
      firstName: ''
    });
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.editForm.controls.firstName.setValue(this.claim.firstName);

  }

  saveForm() {
    this.claim = {...this.claim, firstName: this.editForm.value.firstName};
    this.dialogRef.close(this.claim);
  }
}

export class ClaimEditDialogModel {

  constructor(
    public title: string,
    public claim: IClaim) {
  }
}
