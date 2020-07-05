import { WebsocketService } from './../services/websocket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
  public chat: string[];
  private on;

  constructor(private websocketService: WebsocketService) {
    this.on = this.websocketService.listen('getData');
  }

  ngOnInit(): void {
    this.on.subscribe((data: []) => {
      if (typeof data === "object") {
        this.chat = data;
      } else {
        this.chat.push(data);
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
