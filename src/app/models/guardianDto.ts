export interface GuardianDto{

  id : number;

  nationality_Id: string;

  full_Name:string;

  email: string;

  phone: string;

  userName: string;

  systemUser_Id: number;

  imagePath: string;

  school_Id: number;

  school_Name: string;

  createdBy:number;

  updateBy : number;

  country :string;
  city :string;
  town :string;
  street :string;
  address :string;
  boxNumber :number;

  complaintType?: number,
  complaintInfo?: string,
  busCompany_Id?: number,
  company?: string;


}

// {
//   get { return string.Format("{0}-{1}-{2}-{3}-{4}", Country, City, Town, Street, Address); }
// }
