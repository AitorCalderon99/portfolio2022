import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async seeMore() {
    await Swal.fire({
      title: 'Title',
      text: 'Description',
      showConfirmButton: true,
      confirmButtonColor: 'black',
      confirmButtonText: 'View Site',
    })
  }
}
