import { WebsocketService } from './../services/websocket.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.websocketService.listen('getData').subscribe((data) => {
      console.log('ngOnInit ran');
      console.log(data);
    });
  }

  sendMessage(form: NgForm):void {
    this.websocketService.emit("message", form.value.message);
  }
}
