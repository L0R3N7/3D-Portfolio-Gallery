import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, retry} from "rxjs";
import {Room} from "./room";
import {Tag} from "./tag";
import {Exhibition} from "./exhibition";

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
}

