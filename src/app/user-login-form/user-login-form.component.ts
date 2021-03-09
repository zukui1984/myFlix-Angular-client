import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router ) { }

  ngOnInit(): void {
  }

  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
  // Logic for a successful LOGIN registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(response);
     localStorage.setItem('user', response.user.Username);
     localStorage.setItem('token', response.token);
     this.snackBar.open('login registered successfully!', 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}


