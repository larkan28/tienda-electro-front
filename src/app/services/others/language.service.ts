import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const langDir = "/assets/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  lang = 'es';
  data: any;

  constructor(private http: HttpClient) {
    this.setLanguage(this.lang)
  }

  setLanguage(lang: string) {
    var url = `${langDir}/lang`;

    this.http.get(url).subscribe(result => {
      this.lang = lang;
      this.data = result;
    });
  }

  get(key: string) {
    return this.data === null ? null : this.data[key];
  }
}
