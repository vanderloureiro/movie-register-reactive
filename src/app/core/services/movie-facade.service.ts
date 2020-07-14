import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { MovieService } from './movie.service';
import { Movie } from '../models/movie';

@Injectable({
    providedIn: 'root'
})
export class MovieFacadeService {

    private movies   = new BehaviorSubject<Movie[]>([]);
    readonly movies$ = this.movies.asObservable();

    constructor(private movieService: MovieService) { }

    postMovie(movie: Movie) {

    }

    updateMovie(movie: Movie) {

    }

    deleteMovie(id: number) {

    }
}
