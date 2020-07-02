import { WebsocketService } from './services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Here we listen to the socket.io server
    this.websocketService.listen("getData").subscribe(data => {
      console.log(data);
    });
  }

  increment(): void {
    this.websocketService.emit("increment");
  }
}
