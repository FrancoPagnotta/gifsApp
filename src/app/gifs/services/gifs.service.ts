import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _history: string[] = [];
  private url: string = 'https://api.giphy.com/v1/gifs/search';
  private apiKey: string = '7anxXHJ1cXFwX77VNUYmS7rtKZFQ7Ejl';
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
      this._history = JSON.parse(localStorage.getItem('history')!) || [];
      this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(value: string) {
    value = value.trim().toLowerCase();

    if (!this._history.includes(value)) {
      this._history.unshift(value);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    this.http.get<SearchGifsResponse>(`${this.url}?api_key=${this.apiKey}&q=${value}&limit=10`)
      .subscribe(resp =>  {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }

}
