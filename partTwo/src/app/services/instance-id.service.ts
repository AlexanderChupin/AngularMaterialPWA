import {Injectable} from '@angular/core';
// ALC. instance counter. See [angular \- Is it possible to obtain an instance Id for a service? \- Stack Overflow](https://stackoverflow.com/questions/51602094/is-it-possible-to-obtain-an-instance-id-for-a-service)
@Injectable({
  providedIn: 'root'
})
export class InstanceIdService {
  private static nextId: number = 0;
  // private nextId: Number = 0;
  // constructor() { }
 public getNextId( ): number{
   return InstanceIdService.nextId++;
 }

}
