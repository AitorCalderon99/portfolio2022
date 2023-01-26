import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {deleteObject, getDownloadURL, getMetadata, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {FormControl, FormGroup} from "@angular/forms";
import {WorkService} from "../services/work.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  resumes = new Array<{ name: string, url: string, date: string, size: string }>();
  aboutImgs = new Array<{ name: string, url: string, date: string, size: string }>();
  workForm: FormGroup;
  isChecked = false;


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
  }
  checkAll(){this.isChecked = !this.isChecked};

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

  upload($event: any, folder: string) {
    const file = $event.target.files[0];
    const resumeRef = ref(this.storage, folder + `/${file.name}`)
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
    listAll(resumeRef)
      .then(async res => {
        for (let resume of res.items) {
          let size: number;
          const metadata = await getMetadata(resume);

          const url = await getDownloadURL(resume);

          this.resumes.push({date: new Date(metadata.updated).toLocaleDateString(), size: this.formatBytes( metadata.size), name: resume.name, url: url});
        }
      })
      .catch(error => console.log(error));
  }

  getAboutimgs() {
    this.aboutImgs = new Array<{name: string, url: string, date: string, size: string  }>();
    const aboutRef = ref(this.storage, `aboutimgs`);
    listAll(aboutRef)
      .then(async res => {
        for (let img of res.items) {
          let size: number;
          const metadata = await getMetadata(img);

          const url = await getDownloadURL(img);
          this.aboutImgs.push({date: new Date(metadata.updated).toLocaleDateString(), size: this.formatBytes( metadata.size), name: img.name, url: url});
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

  async onSubmitWork() {
    console.log(this.workForm.value)
    const response = await this.workService.addWork(this.workForm.value);
    console.log(response);
  }

  addNewProject() {

  }
  formatBytes(a: number,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}`}

}
