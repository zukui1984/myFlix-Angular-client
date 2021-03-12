import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-button',
  templateUrl: './dialog-button.component.html',
  styleUrls: ['./dialog-button.component.scss']
})
export class DialogButtonComponent implements OnInit {

  constructor(
    public data: {
    director: string;
    genre: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
