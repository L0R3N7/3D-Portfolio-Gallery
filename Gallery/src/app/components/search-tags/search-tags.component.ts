import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {GalleryService} from "../../shared/gallery.service";
import {Tag} from "../../shared/tag";

@Component({
  selector: 'app-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.scss']
})
export class SearchTagsComponent implements OnInit {
  @Output() selectedTagIds = new EventEmitter<number[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];
  allTagsTitle: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> |undefined;

  constructor(public galleryService : GalleryService) {
    galleryService.getAllTags().subscribe((res:Tag[]) => {
      this.allTagsTitle = res.map(value => {return value.title})
      this.allTags = res;
    })
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTagsTitle.slice())),
    );
  }

  ngOnInit(): void {
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let index = this.allTagsTitle.indexOf(value)

    // Add our fruit
    if (value && index > -1) {
      this.chooseTag(this.allTags[index])
    }

    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.map((value)=>{return value.title}).indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chooseTag(this.allTags[this.allTagsTitle.indexOf(event.option.viewValue)])
    this.fruitInput!.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  chooseTag(value : Tag){
    if (this.tags.indexOf(value) == -1){
      this.tags.push(value);
      this.selectedTagIds.emit(this.tags.map((value)=>{return value.id}));
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.map(function (value){return value.title}).filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
