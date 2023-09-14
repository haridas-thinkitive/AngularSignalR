import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      // .withUrl('/yourHubPath') // Replace with your SignalR hub URL
      .withUrl('https://localhost:7039/TableDataHub')
      .build();
  }

  startConnection() {
    if (this.hubConnection.state === 'Disconnected') {
      this.hubConnection
        .start()
        .then(() => console.log('SignalR connected'))
        .catch((err) => console.error('SignalR connection error: ' + err));
    }
  }

  getHubConnection(): HubConnection {
    return this.hubConnection;
  }
}
