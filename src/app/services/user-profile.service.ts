import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "./config";
import {BehaviorSubject, Observable} from "rxjs";

/*
private String username;
	private String name;
	private String email;
	private Boolean active;
	private List<String> roles;
 */
export interface UserProfile {
  username: string;
  name: string;
  email:string | null;
  active:boolean;
  roles:Array<string>;
}

@Injectable()
export class UserProfileService {
  constructor(public http: HttpClient, public config: Config) {

  }

  getUserInfo():Observable<UserProfile>{
    return this.http.get<UserProfile>(this.config.api + "/rest/user")
  }

  public static emptyUserProfile():UserProfile{
    return {
      username: "",
      name: "",
      email:"",
      active:true,
      roles:[]
    }
  }



}
