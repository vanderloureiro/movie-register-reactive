import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { MovieFacadeService } from '../core/services/movie-facade.service';
import { Movie } from '../core/models/movie';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'director', 'releaseYear', 'delete'];
  movieForm: FormGroup;
  movieList$: Observable<Movie[]>;

  constructor(
    private movieFacade: MovieFacadeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.movieList$ = this.movieFacade.movies$;
    this.createMovieForm();
  }

  createMovieForm() {
    this.movieForm = this.formBuilder.group({
      title: '',
      director: '',
      releaseYear: ''
    });
  }

  saveNewMovie() {
    this.movieFacade.postMovie(this.movieForm.value);
    this.movieForm.reset();
  }

  deleteMovie(id: number) {
    this.movieFacade.deleteMovie(id);
  }

}
