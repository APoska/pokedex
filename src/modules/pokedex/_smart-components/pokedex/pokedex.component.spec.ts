import {
  TestBed,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import { PokedexComponent } from './pokedex.component';
import { HeaderComponent } from '../../_dumb-components/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { PokemonService } from '../../services/pokemon.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { debounceTime } from 'rxjs/operators';

export class PokemonServiceMock {
  getPokemons() {
    return of({ results: null }).pipe(debounceTime(50));
  }
}

describe('Pokedex component tests', () => {
  let fixture: ComponentFixture<PokedexComponent>;
  let pokemonService: PokemonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, PokedexComponent, PokemonComponent],
      imports: [
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: PokemonService, useClass: PokemonServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(PokedexComponent);
  }));

  it('should create Pokedex Component', () => {
    const pokedexComponent = fixture.debugElement.componentInstance;
    expect(pokedexComponent).toBeTruthy();
  });

  it('should call loadMore method', () => {
    fixture.componentInstance.loadMore();
    expect(fixture.componentInstance.limit).toBe(100);
  });

  it('should init form', () => {
    fixture.componentInstance.initForm();
    expect(fixture.componentInstance.form).toBeDefined();
  });

  it("should filter pokemons by query 'pika'", () => {
    fixture.componentInstance.pokemonResponse = {
      results: [{ name: 'pikachu' }, { name: 'squirtle' }],
      count: 2,
      next: '',
      previous: '',
    };
    fixture.componentInstance.filterPokemons('pika');
    expect(fixture.componentInstance.pokemonList).toEqual([
      { name: 'pikachu' },
    ]);
  });
  it("should filter pokemons by query 'asdfghj'", () => {
    fixture.componentInstance.pokemonResponse = {
      results: [{ name: 'pikachu' }, { name: 'squirtle' }],
      count: 2,
      next: '',
      previous: '',
    };
    fixture.componentInstance.filterPokemons('asdfghj');
    expect(fixture.componentInstance.pokemonList).toEqual([]);
  });
  it("should filter pokemons by query 'IkA'", () => {
    fixture.componentInstance.pokemonResponse = {
      results: [
        { name: 'pikachu' },
        { name: 'squirtle' },
        { name: 'magikarp' },
      ],
      count: 2,
      next: '',
      previous: '',
    };
    fixture.componentInstance.filterPokemons('IkA');
    expect(fixture.componentInstance.pokemonList).toEqual([
      { name: 'pikachu' },
      { name: 'magikarp' },
    ]);
  });
});
