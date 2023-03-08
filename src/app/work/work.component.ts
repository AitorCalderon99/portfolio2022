import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import WorkInterface from "../interfaces/work.interface";
import {WorkService} from "../services/work.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor(private workService: WorkService) {
  }

  works = new Array<WorkInterface>();

  ngOnInit(): void {
    this.workService.getWorks().subscribe(works => {
      this.works = works;
    });
  }

  async seeMore(project: WorkInterface) {
    const el = document.createElement('div')
    el.innerHTML = "Here's a <a href='http://google.com'>link</a>"


    await Swal.fire({
      title: project.title,
      text: project.description,
      showCancelButton: true,
      confirmButtonText: 'Ver Sitio',
      cancelButtonText: 'Ver Git',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (project.link && project.link != '#') {
          window.open(project.link, "_blank");
        } else {
          Swal.fire({
            title: 'No hay desmostración disponible',
          })
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        if (project.repository && project.repository != '#') {
          window.open(project.repository, "_blank");
        } else {
          Swal.fire({
            title: 'No hay repositorio disponible',
          })
        }
      }
    })
  }
}
