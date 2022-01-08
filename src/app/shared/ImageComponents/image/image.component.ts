
import { Component, Input, OnInit } from '@angular/core';
import { ImageDto } from 'src/app/models/imageDto';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() id!: number;
  isloading :boolean=false;
  imageDto: ImageDto= {} as ImageDto;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudentImage(this.id);
  }

  getStudentImage(id: number){
    this.studentService.getStudentImage(id).subscribe(res=>{
      this.imageDto= res;
      this.isloading = true;
    })

  }

}
