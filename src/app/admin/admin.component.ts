import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {deleteObject, getDownloadURL, getMetadata, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {WorkService} from "../services/work.service";
import WorkInterface from "../interfaces/work.interface";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';
import filesInterface from "../interfaces/files.interface";
import {FilesService} from "../services/files.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  resumes = new Array<filesInterface>();
  aboutImgs = new Array<filesInterface>();
  works = new Array<WorkInterface>();
  workForm: FormGroup;
  isChecked = false;
  files: FileList;
  userIsAuthenticated = false;
  authSubscription: Subscription;
  aboutImgsFolderName: string;
  resumesFolderName: string;


  constructor(private router: Router, private filesService: FilesService, private workService: WorkService, private store: Store<fromApp.AppState>) {
    this.workForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      codedwith: new FormControl(),
      link: new FormControl(),
      images: new FormControl()
    })
    this.authSubscription = this.store.select('auth').pipe(map(authState => {
      return authState.user
    })).subscribe(user => {
      this.userIsAuthenticated = !!user;
    });
  }


  ngOnInit(): void {
    this.aboutImgsFolderName = this.filesService.aboutImgsFolderName;
    this.resumesFolderName = this.filesService.resumesFolderName;

    this.aboutImgs = this.filesService.getFiles(this.aboutImgsFolderName);
    this.resumes = this.filesService.getFiles(this.resumesFolderName);

    //this.getAboutimgs();
    this.workService.getWorks().subscribe(works => {
      this.works = works;
    });
  }

  checkAll() {
    this.isChecked = !this.isChecked
  };

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(
      AuthActions.logout()
    );
  }


  async prepareUpload($event: any, folder: string) {
    const file = $event.target.files[0];

    folder === this.resumesFolderName ?
      this.resumes = await this.filesService.upload(file, folder) :
      this.aboutImgs = await this.filesService.upload(file, folder);

  }

  async prepareDelete(fileName: string, folder: string) {
    folder === this.resumesFolderName ?
      this.resumes = await this.filesService.delete(fileName, folder) :
      this.aboutImgs = await this.filesService.delete(fileName, folder);
  }


  //Work -> WorkService
  async deleteWork(work: WorkInterface) {
    this.workService.deleteWork(work).then(async () => {
      await Swal.fire({
        icon: "success",
        text: "Deleted",
        showConfirmButton: false,
        timer: 1800
      })
    }).catch(async (error) => {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error,
      })
    });
  }

  /*async onSubmitWork() {
    let form = this.workForm.value;
    if (form.title && form.description && form.codedwith && form.link && form.images) {
      for (let i = 0; i < this.files.length; i++) {
        let item = this.files.item(i);
        if (item) {
          this.upload(<File>this.files.item(i), 'work/' + form.title);
        }
      }
      await this.workService.addWork(this.workForm.value);
    }
  }*/

  workImages($event: any) {
    this.files = $event.target.files;
  }

}
