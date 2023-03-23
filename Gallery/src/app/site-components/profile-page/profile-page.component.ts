import {Component, Inject, OnInit} from '@angular/core';
import {NavbarServiceService} from "../../components/navbar/navbar-service.service";
import {FooterService} from "../../components/footer/footer.service";
import {Exhibition} from "../../shared/class/exhibition";
import {GalleryService} from "../../shared/gallery.service";
import {ExhibitionUser} from "../../shared/class/exhibition-user";
import {AuthService} from "../auth/auth.service";
import {User} from "../../shared/class/user";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user ?: User
  isDeleteMode : boolean = false;
  exhibition_list ?: ExhibitionUser[];

  constructor(public navbar: NavbarServiceService,
              public footer: FooterService,
              private gallery_service: GalleryService,
              private authService: AuthService,
              private matDialog: MatDialog) {
    this.reloadPage()
  }

  reloadPage(){
    const userId = localStorage.getItem('user_id') ?? ''
    this.authService.getUser(userId).subscribe(user => {
      this.user = user
      this.authService.getUserExhibtions(userId).subscribe(exhibitionList => {
        this.exhibition_list = exhibitionList.map(exhibition => { return new ExhibitionUser(exhibition, user?.icon_url ?? '', user?.user_name ?? 'you')})
      })
    })
  }

  ngOnInit(): void {
    this.navbar.show()
    this.footer.show()
  }

  onDelete() {
    this.isDeleteMode = !this.isDeleteMode;
  }

  //Todo add server remove; add "are your sure?" prompt
  //deleteExhibtionEvent(e: Exhibition) {
  //  this.exhibition_list?.splice(this.exhibition_list?.indexOf(e), 1)
 // }
  deleteExhibtionEvent(exhibition: Exhibition) {
    this.matDialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {exhibition_name: exhibition.title}
    }).afterClosed().subscribe(result => {
      console.log("Result of Dialog", result)
      if (result){
        console.log("deleting Exhibition", exhibition.id, exhibition.title)
        this.gallery_service.deleteExhibition(exhibition.id).subscribe(value => {console.log("Successful deletion: ", value); this.reloadPage()}, error => {console.error("There was an error while deleting the exhibition", error)})
      }
    })
  }
}


@Component({
  selector: 'dialog-delete-dialog',
  templateUrl: 'dialog-delete.component.html',
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {exhibition_name: string}) {}
}
