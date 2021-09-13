import {Component} from "@angular/core";

@Component({
  selector: 'youtube-header',
  template: `
    <mat-toolbar color="primary" style="height: 85px;padding: 0 16px;">
        <div fxLayoutAlign="start center" fxFlex="100%" fxHide.xs>
          <button mat-button routerLink="" routerLinkActive="selected" [routerLinkActiveOptions]="{exact:true}">Users</button>
          <button mat-button routerLink="/post" routerLinkActive="selected">Posts</button>
        </div>
    </mat-toolbar>
  `,
  styles: [`
    .selected {
      background: #39951c;
    }
  `]
})
export class HeaderComponent {
  constructor() {
  }
}
