import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {deleteObject, getDownloadURL, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private storage: Storage) {

  }

  resumes = new Array<{ name: string, url: string }>();
  aboutImgs = new Array<{ name: string, url: string }>();


  ngOnInit(): void {
    this.getResumes();
    this.getAboutimgs();
  }

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
    this.resumes = new Array<{ name: string, url: string }>();
    const resumeRef = ref(this.storage, `resume`);
    listAll(resumeRef)
      .then(async res => {
        for (let resume of res.items) {
          const url = await getDownloadURL(resume);
          this.resumes.push({name: resume.name, url: url});
        }
      })
      .catch(error => console.log(error));
  }

  getAboutimgs() {
    this.aboutImgs = new Array<{ name: string, url: string }>();
    const aboutRef = ref(this.storage, `aboutimgs`);
    listAll(aboutRef)
      .then(async res => {
        for (let img of res.items) {
          const url = await getDownloadURL(img);
          this.aboutImgs.push({name: img.name, url: url});
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

}
