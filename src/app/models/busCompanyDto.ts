export interface BusCompanyDto{

  id: number;

  company: string;

  address: string;

  email: string;// have to  added to backend

  phone: string;

  webSiteUrl: string;

  logoPath?: string;

  systemUser_Id?: number;

  userName?:string;

  user_Id?:number;

  createdBy?: number;

  updateBy?:number;

  // country :String;
  // city :string;
  // town :string;
  // street :string;
  // address :string;
  // boxNumber :number;
  // full_Address:string;
}
