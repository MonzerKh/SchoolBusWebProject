// import { Address } from "./address";
// import { PersonalCard } from "./personalCard";

export interface StudentDto{
  id: number;

  national_Number: number;

  full_Name :string;

  email :string;

  phone :string;

  father :string;

  mother :string;

  birthDate :Date;

  gender: string;

  personalImage :string;

  guardian_Id :number;

  school_Id :number;

  guardian_Name?: string;


  userName? :string;

  systemUser_Id? :number;


  school_Name? :string;


  createdBy?: number;

  udateBy?: number;
  lat?: number;

  lng?: number;


  createTime?:Date;
  updateTime?:Date;

  country :string;
  city :string;
  town :string;
  street :string;
  address: string;
  boxNumber :string;
  full_Address:string;
}








