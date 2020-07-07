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
  private onGetData: any;
  private onDisconnect: any;

  constructor(private websocketService: WebsocketService) {
    this.onGetData = this.websocketService.listen('getData');
    this.onDisconnect = this.websocketService.listen("exit");
  }

  ngOnInit(): void {
    this.onGetData.subscribe((data: []) => {
      if (typeof data === "object") {
        this.chat = data;
      } else {
        this.chat.push(data);
      }
    });
    this.onDisconnect.subscribe((message: string) => {
      console.log(message);
    });
  }

  sendMessage(form: NgForm):void {
    this.websocketService.emit("message", form.value.message);
  }

  ngOnDestroy(): void {
    this.onGetData.unsubscribe();
    this.onDisconnect.unsubscribe();
  }
}
