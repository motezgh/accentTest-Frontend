import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arch1004901 } from "../model/arch-1004901";
import { host } from "../domain/domain";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http:HttpClient) { }

  getData():Observable<Arch1004901[]>{
    return this.http.get<getResponseArchive>(host+'/archive')
    .pipe(map(response=>response._embedded.arch_1004901s))
  }

}

interface getResponseArchive{
  _embedded:{
    arch_1004901s:Arch1004901[];
  }
}
