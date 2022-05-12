import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];

  get history() {
    return [...this._history];
  }

  constructor() { }

  searchGifs(value: string) {
    value = value.trim().toLowerCase();

    if (!this._history.includes(value)) {
      this._history.unshift(value);
      this._history = this._history.splice(0, 10);
    }
  }

}
