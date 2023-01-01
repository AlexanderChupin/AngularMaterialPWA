import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
// ALC. page not found template [\#8 Bluescreen \- 404 Page](https://dev.to/webdeasy/25-creative-404-error-pages-with-cool-animations-16jn)
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  //ALC. [keypress \- execute function on any key press angular \- Stack Overflow](https://stackoverflow.com/questions/54876160/execute-function-on-any-key-press-angular)
  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    this.backHome();
  }

  ngOnInit(): void {
  }

  backHome () {
    this._router.navigate(['']);
   }

}
