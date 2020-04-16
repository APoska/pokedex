import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonModel } from '../../models/pokemon.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-container',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  pokemonResponse: PokemonModel.PokemonResponse;
  pokemonList: PokemonModel.Pokemon[];
  limit: number = 50;
  form: FormGroup;
  private _subscription: Subscription = new Subscription();
  constructor(
    private readonly _pokemonService: PokemonService,
    private _fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.initForm();
  }

  fetchData(): void {
    this._pokemonService.getPokemons().subscribe(res => {
      this.pokemonResponse = res;
      this.pokemonList = res.results;
    });
  }

  initForm(): void {
    this.form = this._fb.group({ search: [''] });
    this._subscription.add(
      this.form
        .get('search')
        .valueChanges.pipe(debounceTime(300))
        .subscribe(query => {
          this.filterPokemons(query);
          this.limit = 50;
        }),
    );
  }

  filterPokemons(query: string): void {
    this.pokemonList = this.pokemonResponse.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  loadMore(): void {
    this.limit += 50;
  }
}
