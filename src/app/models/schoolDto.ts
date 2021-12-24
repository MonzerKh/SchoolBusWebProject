import { Byte } from "@angular/compiler/src/util";

export interface SchoolDto {

  id:number;
  school_Name: string;
  manager: string;
  address: string;
  schoolUrl: string;
  phone: string;
  // email:string;
  // logo: string;
  userName: string;
  createdBy: number;
  updateBy: number;
  createUser_Id:number;

  // email: string;// have to  added to backend
  // country :string;
  // city :string;
  // town :string;
  // street :string;
  // boxNumber :number;
  // full_Address:string;
}
