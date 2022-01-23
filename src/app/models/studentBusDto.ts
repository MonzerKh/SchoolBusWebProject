export interface StudentBusDto {
  id: number;
  full_Name: string;
  full_Address: string;
  lat: number;
  lng: number;
  school_Id: number;
  school_Name: string;
  bus_Id: number;
  bus_Name: string;
  company: string;
}

export interface StudentBusList {
  id: number;
  student_Full_Name: string;
  student_Id: number;
  bus_Id: number;
  bus_Marka_Number: string;
  marka:string;
  lat: number;
  lng:number;
  studentCount:number;
}

export interface StudentBusTSP {
  id: number;
  full_Name: string;
  phone: string;
  lat: number;
  lng: number;
  // position: {lat: number,lng: number }
}

export interface StudentMarker {
  id: number;
  full_Name: string;
  phone: string;
  lat: number;
  lng: number;
  position: {lat: number,lng: number }
}
