import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PokemonModel } from '../models/pokemon.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  constructor(private _http: HttpClient) {}

  getPokemons(): Observable<PokemonModel.PokemonResponse> {
    return this._http.get<PokemonModel.PokemonResponse>(
      `${environment.pokeUrl}pokemon?offset=0&limit=1000`,
    );
  }

  getPokemonDetails(name: string): Observable<PokemonModel.Pokemon> {
    return this._http
      .get<PokemonModel.Pokemon>(`${environment.pokeUrl}pokemon/${name}/`)
      .pipe(
        map((res: any) => ({
          image: res.sprites.front_default,
          name: res.name,
          height: res.height * 10,
          weight: res.weight,
        })),
      );
  }
}
