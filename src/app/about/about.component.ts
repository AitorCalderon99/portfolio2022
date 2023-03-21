import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {getDownloadURL, list, listAll, ref, Storage} from "@angular/fire/storage";
import Swal from "sweetalert2";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  backgroundImg: string = '';
  @ViewChild('backgroundImage') backgroundImage: any;

  constructor(private storage: Storage, private renderer: Renderer2, private elementRef: ElementRef, private translateService: TranslateService) {

  }

  ngOnInit(): void {
   this.setBackgroundImg();
    setTimeout(() => {
      //remove the aaa class after 5 seconds
      this.renderer.removeClass(this.backgroundImage.nativeElement, 'hidefirst');
    }, 2000);
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
          title: this.translateService.instant("genericError"),
          text: error,
        })
      });
    }).catch(async error => {
      await Swal.fire({
        icon: "error",
        title: this.translateService.instant("genericError"),
        text: this.translateService.instant("pdfError"),
      })
    })
  }


}
