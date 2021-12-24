// import { Address } from "./address";
// import { PersonalCard } from "./personalCard";

export interface StudentDto{
  id: string;

  nationality_id: number;

  full_Name :string;

  email :string;

  phone :string;

  father :string;

  mother :string;

  guardian_Name: string;

  birthDate :Date;

  gender: string;

  imagePath :File;

  address: string;

  userName? :string;

  school_Id? :number;

  school_Name? :string;

  guardian_Id? :number;

  systemUser_Id? :number;

  createdBy?: number;

  udateBy?: number;

  createTime?:Date;
  updateTime?:Date;

  // country :string;
  // city :string;
  // town :string;
  // street :string;
  // boxNumber :number;
  // full_Address:string;
}
