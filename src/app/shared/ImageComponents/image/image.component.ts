import { SchoolsService } from './../../../_services/schools.service';

import { Component, Input, OnInit } from '@angular/core';
import { ImageDto } from 'src/app/models/imageDto';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input('id') id!: number;
  @Input('IMGType') IMGType: number =0 ;

  isloading: boolean = false;
  imageDto: ImageDto = {} as ImageDto;
  avatar_Image = "/assets/images/avatar.png";

  constructor(private studentService: StudentService, private schoolservice: SchoolsService) { }

  ngOnInit(): void {
    this.getStudentImage(this.id,this.IMGType);
  }

  getStudentImage(id: number,IMGType :number) {
    if (IMGType == 0) {
      this.studentService.getStudentImage(id).subscribe(res => {
        this.imageDto = res;
        this.isloading = true;
      });
    } else {
      this.schoolservice.getSchoolImage(id).subscribe(res => {
        this.imageDto = res;
        this.isloading = true;
      });
    }


  }

}
