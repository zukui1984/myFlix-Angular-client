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
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }
 
  profileUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiDataUser.getUser(username).subscribe((result) => {
      localStorage.getItem('token');  
      console.log(result);    
      this.snackbar.open(`Welcome to your profile, ${username}!`, 'OK', {
        duration: 2000
      });
      this.router.navigate(['user']);
    }, (result) => {
      this.snackbar.open(result, 'OK', {
        duration: 2000
      });
    });
    { console.log('clicked') }
  }

  deleteUser(): void {
    this.fetchApiDataDeleteUser.deleteUser().subscribe(() => {
        console.log('Profile deleted');
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackbar.open('Profile deleted', 'OK', {
          duration: 2000,
      });
    });
  }
}
