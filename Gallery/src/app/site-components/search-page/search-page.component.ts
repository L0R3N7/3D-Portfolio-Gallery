import { Component, OnInit } from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {GalleryService} from "../../shared/gallery.service";
import {Exhibition} from "../../shared/exhibition";
import {debounce, debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  keyUp$ = new Subject<string>;
  isLoading = false;
  searchResults: Exhibition[] = [];

  constructor(public navbar: NavbarServiceService, public footer: FooterService, public galleryService: GalleryService) {
}

  ngOnInit(): void {
    this.navbar.show()
    this.footer.show()

    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.galleryService.getAllExhibitions()),
      tap(()=> this.isLoading = false)
    ).subscribe(exhibitions => this.searchResults = exhibitions)


  }

}
