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
    await Swal.fire({
      title: project.title,
      text: project.description,
      showConfirmButton: true,
      confirmButtonColor: 'black',
      confirmButtonText: 'View Site',

    })
  }
}
