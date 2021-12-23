import { FunctionDto } from "./functionDto";

export interface SystemUserDto{
  id :Number;
  full_Name: string;
  userName: string;
  token : string;
  imagePath: string;
  functionList: FunctionDto;
  createdBy: number;
  updateBy: number;


//function list
  // functionName :string;
  // orders : number;
  // linkRote :string;
  // iconPath :string;

  // contact_Phone : string;
  // school_Id : number;
  // school_Name : string;
  // busCompany_Id : number;
  // company : string;

  // complaintInfo ?: string;
  // complaintType?: number;

}
