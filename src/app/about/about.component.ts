import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {getDownloadURL, list, listAll, ref, Storage} from "@angular/fire/storage";
import {limitToLast, listVal} from "@angular/fire/database";
import Swal from "sweetalert2";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  backgroundImg: string = '';

  constructor(private storage: Storage) {

  }


  ngOnInit(): void {
   this.setBackgroundImg();
  }

  setBackgroundImg() {
    const imgRef = ref(this.storage, `aboutimgs`);
    list(imgRef, {maxResults: 1}).then(async res => {
      await getDownloadURL(res.items[0]).then(r => {
       this.backgroundImg = r;
      })
    }).catch(error => {
      console.log('Could not download background image from backend.')
    })
  }

  downloadResume() {
    const resumeRef = ref(this.storage, `resume`);
    list(resumeRef, {maxResults: 1}).then(res => {
      getDownloadURL(res.items[0]).then(r => {
        window.open(r, "_blank");
      }).catch(async error => {
        await Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: error,
        })
      });
    }).catch(async error => {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: 'PDF no available',
      })
    })
  }


}
