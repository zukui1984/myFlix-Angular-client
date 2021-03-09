import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
  GetAllMoviesService,
  GetOneMovieService,
  GetUserService, 
  DeleteUserService 
} from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataOneMovie: GetOneMovieService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.getMovies();
    });
  }

  openDeleteUserDialog(): void {
    this.dialog.open(DeleteUserService, {
        width: '300px'
    })
  }

  openUserProfile(): void {
    this.fetchApiDataUser.getUser().subscribe((response) => {
        localStorage.getItem('token')
        const username = localStorage.getItem('user');
        this.snackbar.open(`Welcome to your profile, ${username}!`, 'OK', {
        duration: 2000
        });
        this.router.navigate(['user']);
    }, (result) => {
        this.snackbar.open(response, 'OK', {
        duration: 2000
        });
    });
  }


  deleteUser(): void {
    let ok = confirm("Do you want delete your profile?");
    if (ok) {
    this.fetchApiData.deleteUser().subscribe(() => {
      console.log('Profile deleted');
      localStorage.clear();
      this.router.navigate(['welcome']); 
      this.snackBar.open('Profile deleted', 'OK', {
        duration: 2000,
      });
    });
    } else {
      window.location.reload();
    }
  }

}

