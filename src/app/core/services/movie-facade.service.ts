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

    constructor(private movieService: MovieService) {
        this.loadMovies();
    }

    private loadMovies() {
        this.movieService.getMovies().subscribe(
            response => {
                this.movies.next(response);
            }
        );
    }

    postMovie(movie: Movie) {
        this.movieService.postMovie(movie).subscribe(
            response => this.addMovieToArray(response)
        );
    }

    private addMovieToArray(movie: Movie) {
        const newMoviesList = [movie, ...this.movies.value];
        this.movies.next(newMoviesList);
    }

    deleteMovie(id: number) {
        this.movieService.deleteMovie(id).subscribe(
            response => this.removeMovieFromArray(id)
        );
    }

    private removeMovieFromArray(id: number) {
        const index = this.movies.value.findIndex(movie => {
            if (movie.id === id) { return true; }
        });

        const newArray = [... this.movies.value];
        newArray.splice(index, 1);

        this.movies.next(newArray);
    }
}
