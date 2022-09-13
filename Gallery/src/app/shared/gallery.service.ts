import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, retry} from "rxjs";
import {Room} from "./room";
import {Tag} from "./tag";
import {Exhibition} from "./exhibition";
import {Exhibit} from "./exhibit";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpClient: HttpClient) { }

  getAllRooms(): Observable<Room[]>{
    return this.httpClient.get<Room[]>("assets/fakeendpoints/getAllRooms.json");
  }

  getAllTags(): Observable<Tag[]>{
    return this.httpClient.get<Tag[]>("assets/fakeendpoints/getAllTags.json");
  }

  getAllExhibitions(): Observable<Exhibition[]>{
    return this.httpClient.get<Exhibition[]>("assets/fakeendpoints/exhibitions.json")
  }

  postExhibit(exhibit: { room_id: string; description: string; id: number; thumbnail_url: string; title: string }): Observable<any>{
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
    return this.httpClient.post("assets/fakeendpoints/exhibit.json", exhibit,  { headers: httpHeaders })
  }
}

