import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _history: string[] = [];
  private url: string = 'https://api.giphy.com/v1/gifs/search';
  private apiKey: string = '7anxXHJ1cXFwX77VNUYmS7rtKZFQ7Ejl';
  public results: any[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) { }

  searchGifs(value: string) {
    value = value.trim().toLowerCase();

    if (!this._history.includes(value)) {
      this._history.unshift(value);
      this._history = this._history.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`${this.url}?api_key=${this.apiKey}&q=${value}&limit=10`)
      .subscribe(resp =>  {
        this.results = resp.data;
      });
  }

}
