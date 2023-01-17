import { TestBed } from '@angular/core/testing';

import { AlcwebsocketService } from './alcwebsocket.service';
import {InstanceIdService} from "./instance-id.service";
import { TestScheduler } from 'rxjs/testing';
import { rxSandbox } from 'rx-sandbox';
import {throttleTime} from "rxjs";
import {SubscriptionLog} from "rx-sandbox/dist/utils/coreInternalImport";

describe('AlcwebsocketService', () => {
  let service: AlcwebsocketService;
  let instanceIdService: jasmine.SpyObj<InstanceIdService>;
  let testScheduler: TestScheduler;

  //ALC. [javascript \- How to use instanceof with a class which is not defined in the current context? \- Stack Overflow](https://stackoverflow.com/questions/62937658/how-to-use-instanceof-with-a-class-which-is-not-defined-in-the-current-context)
  function getParents(obj) {
    const arr = [];

    while (obj = Reflect.getPrototypeOf(obj)) {
      arr.push(obj.constructor.name);
    }

    return arr;
  }

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

    const { hot, cold, flush, getMessages, e, s} = rxSandbox.create();
    testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal - required
      // for TestScheduler assertions to work via your test framework
      // e.g. using chai.
      // console.log(`Actual: ${JSON.stringify(actual)}, expected: ${JSON.stringify(expected)}`);

      let actualSL: Array<SubscriptionLog> = [];
      let expectedSL: Array<SubscriptionLog> = [];

      // ALC. marbleAssert throw error when comparing subscriptions. Required to convert so (actual[0] instanceof SubscriptionLog) ==  true
      if (actual[0] && getParents(actual[0]).includes('SubscriptionLog')){
        actual.map((v) => actualSL.push(new SubscriptionLog(v.subscribedFrame, v.unsubscribedFrame)));
        expected.map((v) => expectedSL.push(new SubscriptionLog(v.subscribedFrame, v.unsubscribedFrame)));
        rxSandbox.marbleAssert(actualSL).toEqual(expectedSL);
      } else {
        rxSandbox.marbleAssert(actual).toEqual(expected);
      }
      expect(actual).toEqual(expected);
    });
  });

  it('should be created with instance id = 0', () => {
    expect(service).toBeTruthy();
    expect(service.getInstanceId()).toBe(0);
    expect(instanceIdService.getNextId).toHaveBeenCalled();
    expect(instanceIdService.getNextId.calls.count()).toBe(1)
  });

  // This test runs synchronously.
  it('demo generates the stream correctly', () => {
    testScheduler.run((helpers) => {
      const { cold, time, expectObservable, expectSubscriptions } = helpers;
      const e1 = cold(' -a--b--c---|');
      const e1subs = '  ^----------!';
      const t = time('   ---|       '); // t = 3
      const expected = '-a-----c---|';

      expectObservable(e1.pipe(throttleTime(t))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  // This test runs synchronously.
  // ALC. [rxjs/marble\-testing\.md at master · ReactiveX/rxjs](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md#examples-1)
  it('demo of testing subscriptions', () => {
    testScheduler.run(({ expectSubscriptions, hot, expectObservable }) => {
      const source = hot('--a--a--a--a--a--a--a--');
      const sub1 = '      --^-----------!';
      const sub2 = '      ---------^--------!';
      const expect1 = '   --a--a--a--a--';
      const expect2 = '   -----------a--a--a-';

      expectObservable(source, sub1).toBe(expect1);
      expectObservable(source, sub2).toBe(expect2);
      expectSubscriptions(source.subscriptions).toBe([sub1, sub2]);
    });
  });

  // This test runs synchronously.
  it('demo of testing subscriptions. ALC modified', () => {
    testScheduler.run(({ expectSubscriptions, hot, expectObservable }) => {
      const clicks = hot('--a-----a--a-1a----a--');
      const sub1 =              '--^-----------!';
      const sub2 =              '---------^--------!';
      const expect1 =           '--a-----a--a-1';
      const expect2 =           '-----------a-1a---------';
      expectObservable(clicks, sub1).toBe(expect1);
      expectObservable(clicks, sub2).toBe(expect2);
      expectSubscriptions(clicks.subscriptions).toBe([sub1, sub2]);
    });
  });

  // This test runs synchronously.
  /*it('clicks translated into _obsReconnectNewCycle', () => {
    testScheduler.run(({ expectSubscriptions, hot, expectObservable }) => {
      const clicks = hot('--a-----a--a-1a----a--');
      const sub1 =              '--^-----------!';
      const sub2 =              '---------^--------!';
      const expect1 =           '--a-----a--a-1';
      const expect2 =           '-----------a-1a---------';
      expectObservable(clicks, sub1).toBe(expect1);
      expectObservable(clicks, sub2).toBe(expect2);
      expectSubscriptions(clicks.subscriptions).toBe([sub1, sub2]);
    });
  });*/

});
