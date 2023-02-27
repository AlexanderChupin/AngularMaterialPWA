import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { SqlComponent } from './sql.component';
import {HttpClientModule} from "@angular/common/http";
import {LoaderService} from "../loader/loader.service";
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";
import {AlcMessage, AlcMessageType, AlcwebsocketService} from "../services/alcwebsocket.service";
import {AlcserverService} from "../services/alcserver.service";
import {ReplaySubject, Subject} from "rxjs";
import {InstanceIdService} from "../services/instance-id.service";
import {AlcRxjsToolsService} from "../services/alc-rxjs-tools.service";
import createSpyObj = jasmine.createSpyObj;

describe('SqlComponent', () => {
  let component: SqlComponent;
  // let comp: AlcserverService;
  let fixture: ComponentFixture<SqlComponent>;
  let alcwebsocketServiceSpy: jasmine.SpyObj<AlcwebsocketService>;
  //let alcwebsocketService: AlcwebsocketService;
  let spyMessages$: any;
  beforeEach(waitForAsync( () => {
    const spyAlcwebsocketService = createSpyObj('AlcwebsocketService', ['getInstanceId']);
    spyAlcwebsocketService.messages$ = new Subject<AlcMessage>();
    spyAlcwebsocketService.messages$.next({
      type:AlcMessageType.system,
      source:0,
      body: {ClientId:83}
    })
    const stubAlcserverService = {
      wsClientId$: new ReplaySubject<string>(1), //.next('1')
      wsPongId$: new ReplaySubject<number>(1)//.next(1)
    };
    // ALC. assign initial values for wsClientId$ and wsPongId$
    stubAlcserverService.wsClientId$.next('83');
    stubAlcserverService.wsPongId$.next(0);

    //ToDo: investigate [hirezio/auto\-spies: Create automatic spies from classes](https://github.com/hirezio/auto-spies)
    // ALC. investigate using of createSpyFromClass [Cannot read properties of undefined \(reading 'pipe'\) : Angular2](https://www.reddit.com/r/Angular2/comments/welgft/cannot_read_properties_of_undefined_reading_pipe/)
    // const stubAlcserverService = createSpyFromClass(AlcserverService, {
    //   observablePropsToSpyOn: ['viewModel$']
    // });
    /*await*/ TestBed.configureTestingModule({
      declarations: [ SqlComponent ],
      // ALC. solving for: NullInjectorError: R3InjectorError(DynamicTestModule)[HttpService -> HttpClient -> HttpClient]:
      //   NullInjectorError: No provider for HttpClient!
      imports: [/*HttpClientModule, MaterialModule, FormsModule, */AppModule],
      providers: [
        // AlcserverService,
        // LoaderService,
        { provide: AlcwebsocketService, useValue: spyAlcwebsocketService },
        { provide: AlcserverService, useValue: stubAlcserverService }
      ]
    })
    .compileComponents();
    // inject both the component and the dependent service.
    // comp = TestBed.inject(SqlComponent);
    alcwebsocketServiceSpy = TestBed.inject(AlcwebsocketService) as jasmine.SpyObj<AlcwebsocketService>;


  }));
  beforeEach( () => {
    const stubValue = 1;
    alcwebsocketServiceSpy.getInstanceId.and.returnValue(stubValue);
    fixture = TestBed.createComponent(SqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() =>
    component.ngOnDestroy()
  );

  it('should create', () => {
    expect(component)
      .withContext('should create SqlComponent')
      .toBeTruthy();
  });

  it('Websocket service buttons are visible', () => {
    const tableButtons: HTMLElement = fixture.nativeElement;
    const p = tableButtons.querySelector('section.example-section div.boxes')!;
    const boxes: NodeList = p.querySelectorAll('div.box');
    expect(boxes.length)
      .withContext('at lease 3 boxes, each containing label and button each')
      .toBeGreaterThanOrEqual(3);
    const buttons = p.querySelector('div');
    expect(buttons.textContent)
      .withContext('Service Id button is visible')
      .toEqual("Service Id 1 ");
    expect(buttons.nextSibling.textContent)
      .withContext('Client Id button is visible')
      .toEqual("Client Id 83 ");
    expect(buttons.nextSibling.nextSibling.textContent)
      .withContext('Ping Id  button is visible')
      .toEqual("Ping Id 0 ");
    component._alcserver.wsPongId$.next(1);
    fixture.detectChanges();
    expect(buttons.nextSibling.nextSibling.textContent)
      .withContext('Ping Id  button is updated')
      .toEqual("Ping Id 1 ");
    component._alcserver.wsClientId$.next('84');
    fixture.detectChanges();
    expect(buttons.nextSibling.textContent)
      .withContext('Client Id button is updated')
      .toEqual("Client Id 84 ");
  });
});
