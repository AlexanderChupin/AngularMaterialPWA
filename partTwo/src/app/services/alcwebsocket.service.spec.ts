import { TestBed } from '@angular/core/testing';

import { AlcwebsocketService } from './alcwebsocket.service';
import {InstanceIdService} from "./instance-id.service";
import { TestScheduler } from 'rxjs/testing';
import { rxSandbox } from 'rx-sandbox';
import {throttleTime, mergeWith, timer, take, of, Observable, merge} from "rxjs";
import {SubscriptionLog} from "rx-sandbox/dist/utils/coreInternalImport";
import {map, switchMap} from "rxjs/operators";

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
  it('clicks translated into _obsReconnectNewCycle', () => {
    testScheduler.run(({ expectSubscriptions, hot, cold,expectObservable, time }) => {

      const clicks$   = hot('c--------c----c--------------c--------------------')
      const e_recycleFromClick$ =  '012------012--012------------012------------------';
      const e_pingFromRecycle$  =  '------0-------------0----1---------0----1----2---';
      const e_result$ =            'c-----0--c----c-----0----1---c-----0----1----2---';
      const s_result$ =            '^------------------------------------------------!';

      const recycle = cold('012|')
      const s_recycle0 =           '^--!';
      const s_recycle9 =           '---------^--!';
      const s_recycle14 =          '--------------^--!';
      const s_recycle29 =          '-----------------------------^--!';

      const ping =     cold('----0----1----2----3----4----5--')
      const s_ping0 =              '^!';
      const s_ping1 =              '-^!';
      const s_ping2 =              '--^------!';
      const s_ping9 =              '---------^!';
      const s_ping10 =             '----------^!';
      const s_ping11 =             '-----------^--!';
      const s_ping14 =             '--------------^!';
      const s_ping15 =             '---------------^!';
      const s_ping16 =             '----------------^------------!';
      const s_ping29 =             '-----------------------------^!'
      const s_ping30 =             '------------------------------^!'
      const s_ping31 =             '-------------------------------^-----------------!'


      const expect2 =              '--1c----2---c--c----4-----c-----c--';
      const recycleFromClick$:Observable<string> = clicks$.pipe(
        switchMap((x)=>recycle
        )
      );
      const pingFromRecycle$:Observable<string> = recycleFromClick$.pipe(
        switchMap(()=>ping)
      )

      //ALC. result$ - is the main signal to recycle the connection. Either from manual button click or from automatic ping intervals
      // @ts-ignore
      const result$:Observable<string> = merge(clicks$,pingFromRecycle$);

      expectObservable(recycleFromClick$, s_result$).toBe(e_recycleFromClick$);
      expectSubscriptions(clicks$.subscriptions).toBe([s_result$,s_result$,s_result$,s_result$]);
      expectSubscriptions(recycle.subscriptions).toBe([
        s_recycle0,s_recycle0,s_recycle0,
        s_recycle9, s_recycle9,s_recycle9,
        s_recycle14,s_recycle14,s_recycle14,
        s_recycle29,s_recycle29,s_recycle29,
      ]);
      expectObservable(pingFromRecycle$, s_result$).toBe(e_pingFromRecycle$);
      expectSubscriptions(ping.subscriptions).toBe([
        s_ping0,s_ping0,s_ping1,s_ping1,s_ping2,s_ping2,
        s_ping9,s_ping9,s_ping10,s_ping10,s_ping11,s_ping11,
        s_ping14,s_ping14,s_ping15,s_ping15,s_ping16,s_ping16,
        s_ping29,s_ping29,s_ping30,s_ping30,s_ping31,s_ping31
      ]);
      expectObservable(result$, s_result$).toBe(e_result$);
    });
  });

});
