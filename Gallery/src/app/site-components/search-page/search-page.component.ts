import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {GalleryService} from "../../shared/gallery.service";
import {Exhibition} from "../../shared/class/exhibition";
import {debounce, debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap, tap} from "rxjs";
import {Category} from "../../shared/class/category";
import {ExhibitionUser} from "../../shared/class/exhibition-user";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SearchPageComponent implements OnInit {

  keyUp$ = new Subject<string>;
  isLoading = false;
  searchResults: ExhibitionUser[] = [];
  categories: Category[] = []
  filter_icon = "filter_alt";
  selectedCategories: number[] = []


  constructor(public navbar: NavbarServiceService, public footer: FooterService, public galleryService: GalleryService) {
}

  ngOnInit(): void {
    this.navbar.show()
    this.footer.show()

    this.galleryService.getAllExhibitions().subscribe(res => this.searchResults = res);

    this.galleryService.getAllCatagories().subscribe((c) => {
      this.categories = c
      console.log(this.categories)
    })

    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.galleryService.getAllSearch(searchTerm)),
      tap(()=> this.isLoading = false)
    ).subscribe(exhibitions => this.searchResults = exhibitions)

  }

  getCategories(){
    this.filter_icon = "check_circle_outline";



  }

  onMenuClose(){
    this.filter_icon = "filter_alt";
    let searchString = "";
    for(let i = 0; i < this.selectedCategories.length; i++){
      searchString += this.selectedCategories[i] + ","

    }
    if(this.selectedCategories.length > 0){
      this.galleryService.getExhibitonByIds(searchString).subscribe(e => {
        this.searchResults = e
      })
    }else{
      this.galleryService.getAllExhibitions().subscribe(res => this.searchResults = res);

    }

  }

  addCategory(id: number){
    if(!this.selectedCategories.find(c => c == id)){
        this.selectedCategories.push(id)
    }else{

      for( var i = 0; i < this.selectedCategories.length; i++){

        if ( this.selectedCategories[i] === id) {
          this.selectedCategories.splice(i, 1);
        }

      }

    }

}
}

