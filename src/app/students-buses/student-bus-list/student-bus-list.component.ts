import { Component, OnInit } from '@angular/core';
import { SchoolDto } from 'src/app/models/schoolDto';
import { SchoolsService } from 'src/app/_services/schools.service';
import { StudentBusService } from 'src/app/_services/student-bus.service';
import { StudentBusDto, StudentBusList, StudentBusTSP } from '../../models/studentBusDto';

declare const google: any;

@Component({
  selector: 'app-student-bus-list',
  templateUrl: './student-bus-list.component.html',
  styleUrls: ['./student-bus-list.component.scss']
})
export class StudentBusListComponent implements OnInit {

  isLoading: boolean= false;
  schools: SchoolDto[]=[];
  studentBuses: StudentBusList[]= [];
  bulkStudentBus: StudentBusList[]= [];
  studentBusTSP: StudentBusTSP[]=[];
  lat! : number;
  lng! : number;
  zoom!: number;
  googleMapType = 'satellite';
  pointList: { lat: number; lng: number }[] = [];
  selectedArea = 0;
  drawingManager: any;

  origin = { lat: 29.8174782, lng: -95.6814757 };
  destination = { lat: 40.6976637, lng: -74.119764 };
  waypoints = [
     {location: { lat: 39.0921167, lng: -94.8559005 }},
     {location: { lat: 41.8339037, lng: -87.8720468 }}
  ];

  constructor(private schoolService: SchoolsService, private studentBusService: StudentBusService) { }

  ngOnInit(): void {
    this.initMap();
    this.setCurrentPosition();
    this.loadSchoolList();

  }

  private loadSchoolList(){
    this.schoolService.getSchoolList().subscribe(res=>{
      this.schools = res;
      this.isLoading = true;
    },error=>{
      console.log(error);
      this.isLoading = true;
    })
  }

  showStudentBusLists(school_Id: number=12){
    this.isLoading = false;
    this.studentBusService.getStudentBusList(school_Id).subscribe(response=>{
      this.studentBuses= response;
      this.isLoading = true;
    },error=>{
      console.log(error);
      this.isLoading = true;
    })

  }

  showBulkStudentBusLists(bus_Id: number){
    this.isLoading = false;
    this.studentBusService.getBulkStudentBusDetails(bus_Id).subscribe(response=>{
      this.bulkStudentBus= response;
      this.isLoading = true;
    },error=>{
      console.log(error);
      this.isLoading = true;
    })
    this.getStudentBusTSP(bus_Id);
  }

  getStudentBusTSP(bus_Id: number){
    this.isLoading = false;
    this.studentBusService.getStudentBusTSP(bus_Id).subscribe(response=>{
      this.studentBusTSP= response;
      this.isLoading = true;
    },error=>{
      console.log(error);
      this.isLoading = true;
    })
  }


  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  initMap(): void {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 14,
        center: { lat: 40.98907847, lng: 28.72452736 },
      }
    );

    directionsRenderer.setMap(map);

    (document.getElementById("submit") as HTMLElement).addEventListener(
      "click",
      () => {
        this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      }
    );
  }

  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const waypts: google.maps.DirectionsWaypoint[] = [];
    const checkboxArray = document.getElementById(
      'waypoints'
    ) as HTMLSelectElement;

    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: (checkboxArray[i] as HTMLOptionElement).value,
          stopover: true,
        });
      }
    }
    directionsService
      .route({
        origin: (document.getElementById('start') as HTMLInputElement).value,
        destination: (document.getElementById('end') as HTMLInputElement).value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        const route = response.routes[0];
        const summaryPanel = document.getElementById(
          'directions-panel'
        ) as HTMLElement;

        summaryPanel.innerHTML = '';

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;

          summaryPanel.innerHTML +=
            '<b>Route Segment: ' + routeSegment + '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance!.text + '<br><br>';
        }
      })
      .catch((e) => window.alert('Directions request failed due to ' + status));
  }

















  // onMapReady(map: any) {
  //   this.initDrawingManager(map);
  // }

  // const options = {
  //   drawingControl: true,
  //   drawingControlOptions: {
  //    drawingModes: ['polygon'],
  //   },
  //   polygonOptions: {
  //    draggable: true,
  //    editable: true,
  //   },
  //   drawingMode: google.maps.drawing.OverlayType.POLYGON,
  //  };

  //  this.drawingManager = new google.maps.drawing.DrawingManager(options);


  //  updatePointList(path: { getLength: () => any; getAt: (arg0: number) => { (): any; new(): any; toJSON: { (): { lat: number; lng: number; }; new(): any; }; }; }) {
  //   this.pointList = [];
  //   const len = path.getLength();
  //   for (let i = 0; i < len; i++) {
  //     this.pointList.push(
  //       path.getAt(i).toJSON()
  //     );
  //   }
  //   this.selectedArea = google.maps.geometry.spherical.computeArea(
  //     path
  //   );
  //  }

  //  initDrawingManager = (map: any) => {
  //   const self = this;
  //   const options = {
  //     drawingControl: true,
  //     drawingControlOptions: {
  //       drawingModes: ['polygon'],
  //     },
  //     polygonOptions: {
  //       draggable: true,
  //       editable: true,
  //     },
  //     drawingMode: google.maps.drawing.OverlayType.POLYGON,
  //   };
  //   this.drawingManager = new google.maps.drawing.DrawingManager(options);
  //   this.drawingManager.setMap(map);
  //   google.maps.event.addListener(
  //     this.drawingManager,
  //     'overlaycomplete',
  //     (event: { type: any; overlay: { getPaths: () => any; drag: any; getPath: () => any; }; }) => {
  //       if (event.type === google.maps.drawing.OverlayType.POLYGON)    {
  //         const paths = event.overlay.getPaths();
  //         for (let p = 0; p < paths.getLength(); p++) {
  //           google.maps.event.addListener(
  //             paths.getAt(p),
  //             'set_at',
  //             () => {
  //               if (!event.overlay.drag) {
  //                 self.updatePointList(event.overlay.getPath());
  //               }
  //             }
  //           );
  //           google.maps.event.addListener(
  //             paths.getAt(p),
  //             'insert_at',
  //             () => {
  //               self.updatePointList(event.overlay.getPath());
  //             }
  //           );
  //           google.maps.event.addListener(
  //             paths.getAt(p),
  //             'remove_at',
  //             () => {
  //               self.updatePointList(event.overlay.getPath());
  //             }
  //           );
  //         }
  //         self.updatePointList(event.overlay.getPath());
  //       }
  //       if (event.type !== google.maps.drawing.OverlayType.MARKER) {
  //         // Switch back to non-drawing mode after drawing a shape.
  //         self.drawingManager.setDrawingMode(null);
  //         // To hide:
  //         self.drawingManager.setOptions({
  //           drawingControl: false,
  //         });
  //       }
  //     }
  //   );
  // }

}
