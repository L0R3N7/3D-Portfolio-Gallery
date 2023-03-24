import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Tag} from "../../shared/class/tag";
import {GalleryService} from "../../shared/gallery.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.scss']
})
export class SearchTagsComponent implements OnInit {
  @Input("alreadySelectedTags") alreadySelectedTagIds : number[] | undefined;
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
      console.log("Loaded Tags: ", res)

      this.allTagsTitle = res.map(value => {return value.category_title})
      this.allTags = res;
      if(this.alreadySelectedTagIds){
        console.log("Already went through")

        let alreadyTags = this.allTags.filter(value => {
          let index : number = this.alreadySelectedTagIds?.findIndex(value1 => {return value1 == value.id}) ?? -1

          console.log(index)

          if (index != -1){
            this.alreadySelectedTagIds?.splice(index, 1)
            return true
          }
          return false
        })
        if (alreadyTags.length > 0 ){
          console.log(alreadyTags)

          this.tags.push(...alreadyTags)
        }
      }
    })
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTagsTitle.slice())),
    )
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
    const index = this.tags.map((value)=>{return value.category_title}).indexOf(fruit);

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
    console.log("Tag Filter", value)

    const filterValue = value.toLowerCase();

    console.log(this.allTags)
    return this.allTags.map(function (tag){return tag.category_title}).filter(tagTitle => tagTitle.toLowerCase().includes(filterValue));
  }

}
