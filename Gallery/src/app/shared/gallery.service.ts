import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "./class/room";
import {Tag} from "./class/tag";
import {User} from "./class/user";
import {Exhibition} from "./class/exhibition";
import {NavbarServiceService} from "../components/navbar/navbar-service.service";
import {UserLoginDTO} from "./class/dto/UserLoginDTO";
=======
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, retry} from "rxjs";
import {Room} from "./room";
import {Tag} from "./tag";
import {Exhibition} from "./exhibition";
import {Exhibit} from "./exhibit";
>>>>>>> ddd5c569c51da686162428c044cf5f2cfba35601

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  supportedFiletypes = new Map<string, string[]>();

  constructor(private httpClient: HttpClient, private navbarService : NavbarServiceService) {
    this.supportedFiletypes.set('image', ['image/png', 'image/jpeg', 'image/jpg']);
    this.supportedFiletypes.set('video', ['mov', 'mp4']);
    this.supportedFiletypes.set('3d', ['gltf', 'obj', 'fbx', 'amf']);
  }


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
<<<<<<< HEAD
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.httpClient.post("assets/fakeendpoints/exhibit.json", exhibit,  { headers: httpHeaders })
  }

  getSupportedFiletypes(type:string = ""){
    for (const key of this.supportedFiletypes.keys()){
      if (type && key.includes(type)){
        return this.supportedFiletypes.get(key.toLowerCase());
      }
    }
    var result = []
    for (const value of this.supportedFiletypes.values()){
      result.push(value)
    }
    return result.flat();
  }

  getClassificationPerType(type:string){
    for (const key of this.supportedFiletypes.keys()){
      if (type && this.supportedFiletypes.get(key)?.includes(type)){
        return key;
      }
    }
    return ""
  }
=======
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
    return this.httpClient.post("assets/fakeendpoints/exhibit.json", exhibit,  { headers: httpHeaders })
  }
>>>>>>> ddd5c569c51da686162428c044cf5f2cfba35601
}

