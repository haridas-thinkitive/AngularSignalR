export class PaymentDetail {
    id: number = 0;
  trackingId: number = 0;
  name: string = "";
  latitude: number = 0.0; // Use 'number' for double values
  longitude: number = 0.0; // Use 'number' for double values
  location: string = "";
  isCheckedOut: boolean = true; // Add the type 'boolean'
  isCheckedIn: boolean = true; // Add the type 'boolean'
  barCode: string = "";
}
