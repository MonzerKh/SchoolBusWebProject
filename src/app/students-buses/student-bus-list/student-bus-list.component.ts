import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolDto } from 'src/app/models/schoolDto';
import { SchoolsService } from 'src/app/_services/schools.service';
import { StudentBusService } from 'src/app/_services/student-bus.service';
import {
  GoogleMap,
  MapDirectionsService,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import {
  StudentBusDto,
  StudentBusList,
  StudentBusTSP,
  StudentMarker,
} from '../../models/studentBusDto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Position } from 'src/app/models/positionDto';

declare const google: any;

@Component({
  selector: 'app-student-bus-list',
  templateUrl: './student-bus-list.component.html',
  styleUrls: ['./student-bus-list.component.scss'],
})
export class StudentBusListComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

   directionsService = new google.maps.DirectionsService();
   directionsRenderer = new google.maps.DirectionsRenderer();

  isLoading: boolean = false;
  schools: SchoolDto[] = [];
  SchoolSel!: SchoolDto;
  studentBuses: StudentBusList[] = [];
  BusSel: StudentBusList = {} as StudentBusList;
  bulkStudentBus: StudentBusList[] = [];
  studentBusTSP: StudentBusTSP[] = [];
  lat!: number;
  lng!: number;
  tripType: string='FromSchool';
  googleMapType = 'satellite';
  directionsResults$:
    | Observable<google.maps.DirectionsResult | undefined>
    | undefined;
  practicalPointList: google.maps.DirectionsWaypoint[] = [];
  mathmaticalPointList: google.maps.DirectionsWaypoint[] = [];
  studentMarkers: google.maps.Marker[] = [];
  pathPolyline!: google.maps.Polyline;
  vertices:Position[]=[];
  currentPosition:Position={}as Position;
  infoContent = '';
  zoom = 14;

  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    center: this.center,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    disableDefaultUI: false,
    zoom: 13,
    maxZoom: 20,
    minZoom: 0,
  };

  getcurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  verticess: google.maps.LatLngLiteral[] = [
    { lat: 40.98309619, lng: 28.72480765 },
    { lat: 40.97440853, lng: 28.71475396 },
    { lat: 40.97199236, lng: 28.72693062 },
    { lat: 40.98350193, lng: 28.731941 },
    { lat: 40.98121972, lng: 28.74447228 },
  ];

  constructor(
    private schoolService: SchoolsService,
    private studentBusService: StudentBusService,
    private mapDirectionsService: MapDirectionsService
  ) {}

  ngOnInit(): void {
    // this.initMap();
    this.setCurrentPosition();
    this.loadSchoolList();
    this.getcurrentPosition()
  }

  private loadSchoolList() {
    this.schoolService.getSchoolList2().subscribe(
      (res) => {
        this.schools = res.filter((x) => x.busCount > 0);
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );
  }

  getSchoolBusList(school: SchoolDto) {
    this.isLoading = false;
    this.SchoolSel = school;
    this.studentBusService.getSchoolBusList(school.id).subscribe(
      (response) => {
        this.studentBuses = response.filter((x) => x.studentCount > 0);
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );
  }

  showBulkStudentBusLists(bus: StudentBusList) {
    this.isLoading = false;
    this.BusSel = bus;
    this.studentBusService.getBulkStudentBusDetails(bus.bus_Id).subscribe(
      (response) => {
        this.bulkStudentBus = response;
        // this.createPracticalShortPath();
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );
  }

  createPracticalShortPath() {
    this.practicalPointList = [];
    this.studentMarkers = [];
    this.vertices = [];

    for (let i = 0; i < this.bulkStudentBus.length; i++) {
      this.practicalPointList.push({
        location: new google.maps.LatLng(
          {
            lat: this.bulkStudentBus[i].lat,
            lng: this.bulkStudentBus[i].lng,
          },
          true
        ),
        stopover: true,
      });
      this.studentMarkers.push(
        new google.maps.Marker({
          position: {
            lat: this.bulkStudentBus[i].lat,
            lng: this.bulkStudentBus[i].lng,
          },
          label: {
            color: 'darkblue',
            text: this.bulkStudentBus[i].student_Full_Name,
          },
        })
      );
    }
    this.getcurrentPosition()
    this.calculateAndDisplayRoute();
    const request: google.maps.DirectionsRequest = {
      origin: this.tripType=="FromSchool"?{ lat: this.SchoolSel.lat!, lng: this.SchoolSel.lng! }: { lat: 40.97309620, lng: 28.71480766 },
      destination: this.tripType=="FromSchool"?{ lat: 40.97309620, lng: 28.71480766 }:{ lat: this.SchoolSel.lat!, lng: this.SchoolSel.lng! },
      // origin:  { lat: 40.98907847, lng: 28.72452736 },
      // destination: { lat: 40.98907847, lng: 28.72452736 },
      waypoints: this.practicalPointList,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
    };
    this.directionsResults$ = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
  }

  calculateAndDisplayRoute() {
    this.directionsService
      .route({
        origin: this.tripType=="FromSchool"?{ lat: this.SchoolSel.lat!, lng: this.SchoolSel.lng! }: { lat: 40.97309620, lng: 28.71480766 },
        destination: this.tripType=="FromSchool"?{ lat: 40.97309620, lng: 28.71480766 }:{ lat: this.SchoolSel.lat!, lng: this.SchoolSel.lng! },
        waypoints: this.practicalPointList,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response: { routes: any[]; }) => {
        this.directionsRenderer.setDirections(response);

        const route = response.routes[0];
        const summaryPanel = document.getElementById(
          "directions-panel"
        ) as HTMLElement;

        summaryPanel.innerHTML = "";

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;
          summaryPanel.innerHTML +=
          "<b>Route Segment: " + routeSegment + "</b><br>";
          // "<b>"+this.bulkStudentBus[i].student_Full_Name+": " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML += route.legs[i].distance!.text + "<br><br>";
        }
      })
      .catch((e: any) => window.alert("Directions request failed due to " + status));
  }

  getStudentBusTSP() {
    this.isLoading = false;

    this.studentBusService.getStudentBusTSP(this.BusSel.bus_Id,this.SchoolSel.id).subscribe(
      (response) => {
        this.studentBusTSP = response;
        this.createMathmaticalShortPath();
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );
  }

  createMathmaticalShortPath() {
    this.practicalPointList = [];
    this.mathmaticalPointList = [];
    this.studentMarkers = [];
    this.vertices = [];

    for (let i = 0; i < this.studentBusTSP.length; i++) {
      this.mathmaticalPointList.push({
        location: new google.maps.LatLng(
          {
            lat: this.studentBusTSP[i].lat,
            lng: this.studentBusTSP[i].lng,
          },
          true
        ),
        stopover: true,
      });

      this.studentMarkers.push(
        new google.maps.Marker({
          position: {
            lat: this.studentBusTSP[i].lat,
            lng: this.studentBusTSP[i].lng,
          },
          label: {
            color: 'darkblue',
            text: this.studentBusTSP[i].full_Name,
          },
        })
      );

      this.vertices.push(
        {
           lat:this.studentBusTSP[i].lat,
           lng:this.studentBusTSP[i].lng,
        })

    }
    this.getcurrentPosition();
    const request: google.maps.DirectionsRequest = {
      destination: { lat: 40.97309620, lng: 28.71480766 },
      origin: { lat: this.SchoolSel.lat!, lng: this.SchoolSel.lng! },
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: this.mathmaticalPointList,
      optimizeWaypoints: true,
    };
    this.directionsResults$ = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  openInfo(marker: MapMarker, info: string) {
    this.infoContent = info;
    this.info.open(marker);
  }

  // initMap(): void {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   const map = new google.maps.Map(
  //     document.getElementById("map") as HTMLElement,
  //     {
  //       zoom: 14,
  //       center: { lat: 40.98907847, lng: 28.72452736 },
  //     }
  //   );

  //   directionsRenderer.setMap(map);

  //   (document.getElementById("submit") as HTMLElement).addEventListener(
  //     "click",
  //     () => {
  //       this.calculateAndDisplayRoute(directionsService, directionsRenderer);
  //     }
  //   );
  // }

  // calculateAndDisplayRoute(
  //   directionsService: google.maps.DirectionsService,
  //   directionsRenderer: google.maps.DirectionsRenderer
  // ) {
  //   const waypts: google.maps.DirectionsWaypoint[] = [];
  //   const checkboxArray = document.getElementById(
  //     'waypoints'
  //   ) as HTMLSelectElement;

  //   for (let i = 0; i < checkboxArray.length; i++) {
  //     if (checkboxArray.options[i].selected) {
  //       waypts.push({
  //         location: (checkboxArray[i] as HTMLOptionElement).value,
  //         stopover: true,
  //       });
  //     }
  //   }
  //   directionsService
  //     .route({
  //       origin: (document.getElementById('start') as HTMLInputElement).value,
  //       destination: (document.getElementById('end') as HTMLInputElement).value,
  //       waypoints: waypts,
  //       optimizeWaypoints: true,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     })
  //     .then((response) => {
  //       directionsRenderer.setDirections(response);

  //       const route = response.routes[0];
  //       const summaryPanel = document.getElementById(
  //         'directions-panel'
  //       ) as HTMLElement;

  //       summaryPanel.innerHTML = '';

  //       // For each route, display summary information.
  //       for (let i = 0; i < route.legs.length; i++) {
  //         const routeSegment = i + 1;

  //         summaryPanel.innerHTML +=
  //           '<b>Route Segment: ' + routeSegment + '</b><br>';
  //         summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
  //         summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
  //         summaryPanel.innerHTML += route.legs[i].distance!.text + '<br><br>';
  //       }
  //     })
  //     .catch((e) => window.alert('Directions request failed due to ' + status));
  // }

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
