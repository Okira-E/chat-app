import { WebsocketService } from './../services/websocket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
  private on;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.on = this.websocketService.listen('getData');
    this.on.subscribe((data: []) => {
      if (typeof data === "object") {
        for (let i = 0; i < data.length; ++i) {
          console.log(data[i], '\n');
        }
      } else {
        console.log(data);
      }
    });
  }

  sendMessage(form: NgForm):void {
    this.websocketService.emit("message", form.value.message);
  }

  ngOnDestroy(): void {
    this.on.unsubscribe();
  }
}
