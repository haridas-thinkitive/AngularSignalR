import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { SignalRService } from '../signalr.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [],
})
export class PaymentDetailsComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    public signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    // Establish the SignalR connection
    this.signalRService.startConnection();

    // Listen for the "ReceiveUpdate" event from SignalR
    this.signalRService.getHubConnection().on('ReceiveUpdate', (id: number) => {
      console.log(`Received update: Record with ID ${id} has been deleted.`);
      // Handle received update (e.g., update UI)

      // Refresh the list when a record is deleted
      this.removeRecordFromList(id);

    });
    // Refresh the list on component initialization
    this.service.refreshList();

  }

  onDelete(id: number) {
    // Call the SignalR hub method for deleting a record
    this.signalRService.getHubConnection().invoke('DeleteRecord', id).then(() => {
      console.log('Record deletion request sent to server.');

      
      // After sending the deletion request, make the HTTP request to delete the record
      this.service.DeletePaymentDetail(id).subscribe({
        next: (res) => {
          if (Array.isArray(res)) {
            // If it's an array, assign it directly to this.service.list
            this.service.list = res as PaymentDetail[];
          } else {
            // If it's a single item, wrap it in an array and assign
            this.service.list = [res as PaymentDetail];
          }
        },
        error: (err) => {
          console.error('Error deleting record: ', err);
        },
      });
    }).catch((error) => {
      console.error('Error sending deletion request to server: ', error);
    });
  }
  




  removeRecordFromList(id: number) {
    const index = this.service.list.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.service.list.splice(index, 1);
    }
  }
}
