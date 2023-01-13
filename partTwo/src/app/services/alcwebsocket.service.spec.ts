import { TestBed } from '@angular/core/testing';

import { AlcwebsocketService } from './alcwebsocket.service';
import {InstanceIdService} from "./instance-id.service";

describe('AlcwebsocketService', () => {
  let service: AlcwebsocketService;
  let instanceIdService: jasmine.SpyObj<InstanceIdService>;


  beforeEach(() => {
    const instanceIdServiceStub =  jasmine.createSpyObj('InstanceIdService', ['getNextId']);
    instanceIdServiceStub.getNextId.and.returnValue(0);
    //ALC. [Объекты Spy ⚡️ Angular с примерами кода](https://angdev.ru/doc/unit-testing-spy-objects/)
    //const appServiceSpy = spyOn(instanceIdService, 'getNextId'); - could be easily replaced by direct calls of similar functions on stub

    TestBed.configureTestingModule({
      providers:[{provide: InstanceIdService , useValue: instanceIdServiceStub}]
    });
    service = TestBed.inject(AlcwebsocketService);
    instanceIdService = TestBed.inject(InstanceIdService) as jasmine.SpyObj<InstanceIdService>;
  });

  it('should be created with instance id = 0', () => {
    expect(service).toBeTruthy();
    expect(service.getInstanceId()).toBe(0);
    expect(instanceIdService.getNextId).toHaveBeenCalled();
    expect(instanceIdService.getNextId.calls.count()).toBe(1)
  });

});
