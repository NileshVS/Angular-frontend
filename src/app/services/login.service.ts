import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class LoginServices {
    baseURL="http://localhost:3000/api";
    private postUserURL:string = `${this.baseURL}/user_post`;
    private uploadFileURL:string = `${this.baseURL}/upload_file`;

    private Headers:HttpHeaders;

    constructor(private http: HttpClient){
        this.Headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    postUser(body):Observable<any>{
        return this.http.post(this.postUserURL, JSON.stringify(body), {headers:this.Headers});
    };

    uploadFile(data){
        return this.http.post(this.uploadFileURL, data);
    }
    
}