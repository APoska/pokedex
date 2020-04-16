import { Component, Input, OnInit } from '@angular/core';
import { PokemonModel } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: PokemonModel.Pokemon;

  constructor(private readonly _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this._pokemonService
      .getPokemonDetails(this.pokemon.name)
      .subscribe(res => (this.pokemon = { ...this.pokemon, ...res }));
  }
}
