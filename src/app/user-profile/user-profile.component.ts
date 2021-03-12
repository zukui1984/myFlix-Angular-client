import { Component, OnInit } from '@angular/core';
import {
  GetUserService,
  GetAllMoviesService,
  DeleteFavoriteMovieService,
  DeleteUserService
} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserProfileComponent } from '../update-user-profile/update-user-profile.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];
  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: GetAllMoviesService,
    // public fetchApiData3: DeleteFavoriteMovieService,
    public fetchApiData4: DeleteUserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
    });
  }
  getMovies(): void {
    this.fetchApiData2.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }
  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    return this.favorites;
  }
  // removeFromFavorites(id: string, title: string): void {
  //   this.fetchApiData3.deleteFavoriteMovie(id).subscribe(() => {
  //     this.snackBar.open(
  //       `${title} has been removed from your Favorites`, 'OK', {
  //         duration: 2000,
  //       }
  //     );
  //     setTimeout(function() {
  //       window.location.reload();
  //     }, 1000);
  //   });
  // }
  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateUserProfileComponent, {
      width: '280px',
    });
  }
  deleteProfile(): void {
    let ok = confirm('Are you sure you want to delete your profile ?\nThis action cannot be undone.');
    if (ok) {
      this.fetchApiData4.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']); // routes to the ‘welcome’ view
        this.snackBar.open('Profile Deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }
}