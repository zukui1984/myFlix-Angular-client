import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  GetAllMoviesService,
  GetOneMovieService,
  GetUserService,
  DeleteUserService
} from '../fetch-api-data.service';

import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataOneMovie: GetOneMovieService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showDetailsDialog(title: string, image: string, description: string,
    director: string, genre: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, image, description, director, genre },
    });
  }

  showDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth, death },
    });
  }

  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
    });
  }

}


