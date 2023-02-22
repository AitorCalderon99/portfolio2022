import {Injectable} from '@angular/core';
import {Firestore} from "@angular/fire/firestore";
import {deleteObject, getDownloadURL, getMetadata, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import filesInterface from "../interfaces/files.interface";
import {from} from "rxjs";
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class FilesService {
  aboutImgsFolderName = 'aboutimgs';
  resumesFolderName = 'resume';

  constructor(private firestore: Firestore, private storage: Storage) {
  }

  getFiles(folder: string): filesInterface[] {
    let items = new Array<filesInterface>();

    listAll(ref(this.storage, folder))
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
    return items;
  }

  async upload(file: File, folder: string) {
    const resumeRef = ref(this.storage, folder + `/${file.name}`);
    await uploadBytes(resumeRef, file)
      .then(async r => {
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
    return this.getFiles(folder);
  }

  async delete(fileName: string, folder: string) {
    const fileToDelete = ref(this.storage, folder + '/' + fileName);

    await deleteObject(fileToDelete).then(async () => {
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
    return this.getFiles(folder);
  }

  formatBytes(a: number, b = 2) {
    if (!+a) return "0 Bytes";
    const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]}`
  }
}
