import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string = 'https://api.giphy.com/v1/gifs/search';
  private apiKey: string = '7anxXHJ1cXFwX77VNUYmS7rtKZFQ7Ejl';
  private _history: string[] = [];
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

    const params = new HttpParams()
                        .set('api_key', this.apiKey)
                        .set('q', value)
                        .set('limit', 10); 

    this.http.get<SearchGifsResponse>(`${this.url}`, { params: params }) // Here also we can use only params, because params: params is the same as only params, the two properties has the same name.
      .subscribe(resp =>  {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }

}
