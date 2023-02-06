import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {deleteObject, getDownloadURL, getMetadata, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {WorkService} from "../services/work.service";
import {AngularFireStorageReference} from "@angular/fire/compat/storage";
import {Reference} from "@angular/fire/compat/firestore";
import WorkInterface from "../interfaces/work.interface";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  resumes = new Array<{ name: string, url: string, date: string, size: string }>();
  aboutImgs = new Array<{ name: string, url: string, date: string, size: string }>();
  works = new Array<WorkInterface>();
  workForm: FormGroup;
  isChecked = false;
  files: FileList;


  constructor(private userService: UserService, private router: Router, private storage: Storage, private workService: WorkService) {
    this.workForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      codedwith: new FormControl(),
      link: new FormControl(),
      images: new FormControl()
    })
  }


  ngOnInit(): void {
    this.getResumes();
    this.getAboutimgs();
    this.workService.getWorks().subscribe(works => {
      this.works = works;
    });
  }

  checkAll() {
    this.isChecked = !this.isChecked
  };

  onLogout() {
    this.userService.logout()
      .then(() => {
          Swal.fire({
            icon: 'success',
            background: 'transparent',
            text: 'Bye master',
            color: 'white',
            showConfirmButton: false,
            timer: 1600
          }).then(async r => {
            await this.router.navigate(['/']);
          })
        }
      )
      .catch(error => console.log(error));
  }

  prepareUpload($event: any, folder: string) {
    const file = $event.target.files[0];
    this.upload(file, folder)
  }

  upload(file: File, folder: string) {
    const resumeRef = ref(this.storage, folder + `/${file.name}`);
    uploadBytes(resumeRef, file)
      .then(async r => {
        folder == 'resume' ? this.getResumes() : this.getAboutimgs();

        await Swal.fire({
          icon: "success",
          text: "Uploaded",
          showConfirmButton: false,
          timer: 1800
        })

      })
      .catch(async error => {
        await Swal.fire({
          icon: "error",
          text: error,
          showConfirmButton: true,
        })
      })
  }

  getResumes() {
    this.resumes = new Array<{ name: string, url: string, date: string, size: string }>();
    const resumeRef = ref(this.storage, `resume`);
    this.listItems(resumeRef, this.resumes);
  }

  getAboutimgs() {
    this.aboutImgs = new Array<{ name: string, url: string, date: string, size: string }>();
    const aboutRef = ref(this.storage, `aboutimgs`);
    this.listItems(aboutRef, this.aboutImgs);
  }

  listItems(ref: any, items: any) {
    listAll(ref)
      .then(async res => {
        for (let item of res.items) {
          const metadata = await getMetadata(item);

          const url = await getDownloadURL(item);
          items.push({
            date: new Date(metadata.updated).toLocaleDateString(),
            size: this.formatBytes(metadata.size),
            name: item.name,
            url: url
          });
        }
      })
      .catch(error => console.log(error));
  }

  delete(fileName: string, folder: string) {
    const fileToDelete = ref(this.storage, folder + '/' + fileName);

    deleteObject(fileToDelete).then(async () => {
      folder == 'resume' ? this.getResumes() : this.getAboutimgs();

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

  async onSubmitWork() {

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
  }

  formatBytes(a: number, b = 2) {
    if (!+a) return "0 Bytes";
    const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]}`
  }

  workImages($event: any) {
    this.files = $event.target.files;
  }

}
