import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    private resourceUrl = environment.localhost + ':3000/movie';

    constructor(private httpClient: HttpClient) { }

    getMovies(): Observable<Movie[]> {
        return this.httpClient.get<Movie[]>(this.resourceUrl);
    }

    postMovie(movie: Movie): Observable<Movie> {
        return this.httpClient.post<Movie>(this.resourceUrl, movie);
    }

    deleteMovie(id: number): Observable<any> {
        const path = `${this.resourceUrl}/${id}`;
        return this.httpClient.delete(path);
    }
}
