import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModalComponent} from "../../modal/modal.component";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamCardComponent implements OnInit {
  team = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    starship: new FormControl('', [
      Validators.required
    ]),
    planet: new FormControl('', [
      Validators.required
    ]),
    crew: new FormControl('', [
      Validators.required
    ])
  });

  constructor(public dialogRef: MatDialogRef<TeamCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.team.patchValue(this.data);
  }

  submit() {
    if (!this.team.valid) {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Заполните все поля'
        },
        disableClose: true
      })
    } else {
      this.dialogRef.close({
        isTeamAddedOrEdited: true,
        data: this.team.value
      });
    }
  }

  close() {
    this.dialogRef.close({
      isTeamAddedOrEdited: false
    });
  }
}
