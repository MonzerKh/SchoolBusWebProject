export interface SupervisorDto{
  id: number;
  full_Name: string;
  email: string;
  phone: string;
  school_Id: number;
  school_Name: string;

  country: string;
  city: string;
  town: string;
  street: string;
  address: string;
  boxNumber: string;
  systemUser_Id: number;

  userName: string;
  createdBy: number;
  updateBy: number;
  createTime: Date;
  updateTime: Date;
}
