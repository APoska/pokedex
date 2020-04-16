import { NgModule } from '@angular/core';
import { POKEDEX_SMART_COMPONENTS } from './_smart-components';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './_smart-components/pokedex/pokedex.component';
import { POKEDEX_DUMB_COMPONENTS } from './_dumb-components';
import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

export const routes: Routes = [{ path: '', component: PokedexComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  exports: [],
  declarations: [...POKEDEX_SMART_COMPONENTS, ...POKEDEX_DUMB_COMPONENTS],
  providers: [PokemonService],
})
export class PokedexModule {}
