import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NavbarServiceService} from "../components/navbar/navbar-service.service";
import {Room} from "./class/room";
import {Observable} from "rxjs";
import {Tag} from "./class/tag";
import {Exhibition} from "./class/exhibition";

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

  URL = "http://localhost:8080/api/"

  getAllRooms(): Observable<Room[]>{
    return this.httpClient.get<Room[]>("assets/fakeendpoints/getAllRooms.json");
  }

  getAllTags(): Observable<Tag[]>{
    return this.httpClient.get<Tag[]>("assets/fakeendpoints/getAllTags.json");
  }

  getAllExhibitions(): Observable<Exhibition[]>{
    return this.httpClient.get<Exhibition[]>(this.URL + "exhibitions/all" )
  }

  getAllSearch(searchTerm: String): Observable<Exhibition[]>{
    return this.httpClient.get<Exhibition[]>(this.URL + "exhibitions/search/" + searchTerm )
  }

  postExhibit(exhibit: { room_id: string; description: string; id: number; thumbnail_url: string; title: string }): Observable<any>{
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

  postFile(fd: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.URL}exhibitions/upload`, fd, {
      reportProgress: true,
      responseType: "json"
    })

    return this.httpClient.request(req)
  }

  getFile(fileName: string): Observable<any>{
    return this.httpClient.get(`${this.URL}exhibitions/get/${fileName}`, {responseType: 'blob'})
  }
}

