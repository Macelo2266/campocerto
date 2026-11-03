import { Component, ElementRef, inject, input, model, signal, viewChild } from '@angular/core';
import { BrazilianCity, BrazilianLocationsService, BrazilianState } from '../../core/api/brazilian-locations.service';
import { cityKey } from '../../core/util/city';

@Component({
  selector: 'app-city-list-editor',
  templateUrl: './city-list-editor.html',
  styleUrl: './city-list-editor.css',
})
export class CityListEditor {
  readonly cities = model<string[]>([]);
  readonly suggestions = input<string[]>([]);
  readonly baseCity = input('');
  readonly max = input(30);
  readonly inputId = input('city-editor');

  private readonly locations = inject(BrazilianLocationsService);
  protected readonly states = signal<BrazilianState[]>([]);
  protected readonly municipalities = signal<BrazilianCity[]>([]);
  protected readonly selectedState = signal('');
  protected readonly selectedCity = signal('');
  protected readonly loadingCities = signal(false);
  protected readonly locationsError = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly statusMessage = signal('');

  constructor() {
    this.locations.states().subscribe({
      next: (states) => this.states.set(states),
      error: () => this.locationsError.set('Não foi possível carregar os estados.'),
    });
  }

  protected onStateChange(stateCode: string): void {
    this.selectedState.set(stateCode);
    this.selectedCity.set('');
    this.municipalities.set([]);
    this.locationsError.set(null);
    if (!stateCode) return;
    this.loadingCities.set(true);
    this.locations.cities(stateCode).subscribe({
      next: (cities) => { this.municipalities.set(cities); this.loadingCities.set(false); },
      error: () => { this.locationsError.set('Não foi possível carregar os municípios deste estado.'); this.loadingCities.set(false); },
    });
  }

  protected add(): void {
    const name = this.selectedCity().trim().replace(/\s+/g, ' ');
    const key = cityKey(name);
    if (!this.selectedState()) return this.fail('Selecione um estado.');
    if (!name) return this.fail('Selecione uma cidade.');
    if (key === cityKey(this.baseCity())) return this.fail('A sua cidade principal já está incluída automaticamente.');
    if (this.cities().some((city) => cityKey(city) === key)) return this.fail('Esta cidade já está na lista.');
    if (this.cities().length >= this.max()) return this.fail(`Você pode informar até ${this.max()} cidades.`);
    this.cities.update((list) => [...list, name]);
    this.selectedCity.set('');
    this.errorMessage.set(null);
    this.statusMessage.set(`Cidade adicionada: ${name}.`);
  }

  protected remove(city: string): void {
    this.cities.update((list) => list.filter((item) => item !== city));
    this.errorMessage.set(null);
    this.statusMessage.set(`Cidade removida: ${city}.`);
  }

  private fail(message: string): void {
    this.errorMessage.set(message);
    this.statusMessage.set('');
  }
}
