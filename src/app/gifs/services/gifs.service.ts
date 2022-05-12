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
    this._history.unshift(value);
  }

}
