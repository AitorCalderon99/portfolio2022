import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {deleteObject, getDownloadURL, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {doc, updateDoc} from "@angular/fire/firestore";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private storage: Storage) {

  }

  resumes = new Array<{ name: string, url: string }>();

  ngOnInit(): void {
    this.getResumes();
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

  uploadCv($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const resumeRef = ref(this.storage, `resume/${file.name}`)
    uploadBytes(resumeRef, file)
      .then(r => {
        console.log(r);
        Swal.fire({
          icon: "success",
          text: "Resume uploaded",
          showConfirmButton: false,
          timer: 1800
        })
        this.getResumes();
      })
      .catch(error => {
        Swal.fire({
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

  deleteResume(fileName: string) {
    const fileToDelete = ref(this.storage, 'resume/' + fileName);

    deleteObject(fileToDelete).then(async () => {
      await Swal.fire({
        icon: "success",
        text: "Resume deleted",
        showConfirmButton: false,
        timer: 1800
      })
      this.getResumes();
    }).catch(async (error) => {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error,
      })
    });
  }

}
