import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolDto } from 'src/app/models/schoolDto';
import { SchoolsService } from 'src/app/_services/schools.service';
import { StudentBusService } from 'src/app/_services/student-bus.service';
import { GoogleMap, MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { StudentBusDto, StudentBusList, StudentBusTSP, StudentMarker } from '../../models/studentBusDto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare const google: any;


@Component({
  selector: 'app-student-bus-list',
  templateUrl: './student-bus-list.component.html',
  styleUrls: ['./student-bus-list.component.scss'],
})
export class StudentBusListComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  isLoading: boolean = false;
  schools: SchoolDto[] = [];
  studentBuses: StudentBusList[] = [];
  bulkStudentBus: StudentBusList[] = [];
  studentBusTSP: StudentBusTSP[] = [];
  lat!: number;
  lng!: number;
  googleMapType = 'satellite';
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>| undefined;
  practicalPointList: google.maps.DirectionsWaypoint[] = [];
  mathmaticalPointList: google.maps.DirectionsWaypoint[] = [];
  // selectedArea = 0;
  // drawingManager: any;

  infoContent = "";
  studentMarkers!: [{ id: 'number'; full_Name: 'string'; phone: 'string'; lat: 'number';lng: 'number';
                      position: { lat: 'number'; lng: 'number' };}];

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

  path:google.maps.DirectionsWaypoint[]=[

    // {
    //   location: google.maps.LatLng({lat:40.98309619, lng:28.72480765}, true) ,
    //   stopover: true
    // },
    {
      location:new google.maps.LatLng({ lat: 40.97440853, lng: 28.71475396 }, true) ,
      stopover: true
    },
    {
      location:new google.maps.LatLng({ lat: 40.97199236, lng: 28.72693062 }, true) ,
      stopover: true
    },
    // {
    //   location:new google.maps.LatLng({ lat: 40.98350193, lng: 28.731941 }, true) ,
    //   stopover: true
    // },
    {
      location:new google.maps.LatLng({ lat: 40.98121972, lng: 28.74447228 }, true) ,
      stopover: true
    },
    {
      location:new google.maps.LatLng({ lat: 40.97631794, lng: 28.72748852 }, true) ,
      stopover: true

    },
    {
      location:new google.maps.LatLng({ lat: 40.98174476, lng: 28.71384144 }, true) ,
      stopover: true
    },
    {
      location:new google.maps.LatLng({ lat: 40.97393648, lng: 28.7103653 }, true) ,
      stopover: true
    },{
      location:new google.maps.LatLng({ lat: 40.97490851, lng: 28.74289513 }, true) ,
      stopover: true
    },
    {
      location:new google.maps.LatLng({ lat: 40.98822445, lng: 28.71504214 }, true) ,
      stopover: true
    },
    {
      location:new google.maps.LatLng({ lat: 40.98146987, lng: 28.73096373 }, true) ,
      stopover: true
    },
    {
      location:new google.maps.LatLng({ lat: 40.98278556, lng: 28.7031975 }, true) ,
      stopover: true
    },
    {
      location:new google.maps.LatLng({ lat: 40.97973836, lng: 28.72929003 }, true) ,
      stopover: true
    }
]

  studentMarker = [
    {
      id: 35,
      full_Name: 'hurria',
      phone: '05558887799',
      lat: 40.98309619,
      lng: 28.72480765,
      position: { lat: 40.98309619, lng: 28.72480765 },
      label: {
        color: "blue",
        text: "Marker Label"
      },
      title: "1",
      info: "Marker info",
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    },
    {
      id: 40,
      full_Name: 'Aygül Can',
      phone: '0556664332',
      lat: 40.97440853,
      lng: 28.71475396,
      position: { lat: 40.97440853, lng: 28.71475396 },
      label: {
        color: "blue",
        text: "Marker Label"
      },
      title: "2",
      info: "Marker info",
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    },
    {
      id: 39,
      full_Name: 'Nazli Tekin',
      phone: '05566332211',
      lat: 40.97199236,
      lng: 28.72693062,
      position: { lat: 40.97199236, lng: 28.72693062 },
      label: {
        color: "blue",
        text: "Marker Label"
      },
      title: "3",
      info: "Marker info",
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    },
    {
      id: 43,
      full_Name: 'Yağmur Kaya',
      phone: '05564432344',
      lat: 40.98350193,
      lng: 28.731941,
      position: { lat: 40.98350193, lng: 28.731941 },
      label: {
        color: "blue",
        text: "Marker Label"
      },
      title: "4",
      info: "Marker info",
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    },
    {
      id: 42,
      full_Name: 'Derya  Aydin',
      phone: '05564432344',
      lat: 40.98121972,
      lng: 28.74447228,
      position: { lat: 40.98121972, lng: 28.74447228 },
      label: {
        color: "blue",
        text: "Marker Label"
      },
      title: "5",
      info: "Marker info",
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    },
  ];

  vertices: google.maps.LatLngLiteral[] = [
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
  ) { }

  ngOnInit(): void {
    // this.initMap();
    this.setCurrentPosition();
    this.loadSchoolList();
  }

  private loadSchoolList() {
    this.schoolService.getSchoolList().subscribe(
      (res) => {
        this.schools = res;
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );
  }

  getSchoolBusList(school_Id: number) {
    this.isLoading = false;
    this.studentBusService.getSchoolBusList(school_Id).subscribe(
      (response) => {
        this.studentBuses = response;
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );
  }

  showBulkStudentBusLists(bus_Id: number) {
    this.isLoading = false;
    this.studentBusService.getBulkStudentBusDetails(bus_Id).subscribe(
      (response) => {
        this.bulkStudentBus = response;
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );
    for (let i = 0; i < this.bulkStudentBus.length; i++) {
      this.practicalPointList[i].location =new google.maps.LatLng( {lat:this.bulkStudentBus[i].lat, lng:this.bulkStudentBus[i].lng},true);
      this.practicalPointList[i].stopover= true;
    }

    // this.getStudentBusTSP(bus_Id);
  }

  getStudentBusTSP(bus_Id: number) {
    this.isLoading = false;
    this.studentBusService.getStudentBusTSP(bus_Id).subscribe(
      (response) => {
        this.studentBusTSP = response;
        this.isLoading = true;
      },
      (error) => {
        console.log(error);
        this.isLoading = true;
      }
    );

    for (let i = 0; i < this.studentBusTSP.length; i++) {
      this.mathmaticalPointList[i].location =new google.maps.LatLng( {lat:this.studentBusTSP[i].lat, lng:this.studentBusTSP[i].lng},true);
      this.mathmaticalPointList[i].stopover= true;
    }

    // this.createMathmaticalShortPath();
  }

  createPracticalShortPath(){
    const request: google.maps.DirectionsRequest = {
      destination: { lat: 40.98309619, lng: 28.72480765 },
      origin: { lat: 40.98350193, lng: 28.731941 },
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: this.path,
      optimizeWaypoints:true,
    };
    this.directionsResults$ = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));

  }

  createMathmaticalShortPath(){
    const request: google.maps.DirectionsRequest = {
      destination: { lat: 40.98309619, lng: 28.72480765 },
      origin: {  lat: 40.98350193, lng: 28.731941 },
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: this.mathmaticalPointList,
      optimizeWaypoints:true,
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

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
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

