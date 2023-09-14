import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent {

  constructor(public service : PaymentDetailService){

  }
  onSubmit(form : NgForm)
  {
      if(this.service.formData.id == 0)
      this.insertRecoed(form)
       else
       this.updateRecord(form)
  }

        insertRecoed (form:NgForm)
        {

          this.service.postPaymentDetail().subscribe({

            next: resp =>
            { 
              this.service.list = resp as PaymentDetail[]
              this.service.resetForm(form)
            },

            error:err => {console.log(err)}
          })
        }


  updateRecord (form:NgForm){

    this.service.putPaymentDetail().subscribe({ 

      next: resp =>
      { 
        this.service.list = resp as PaymentDetail[]
        this.service.resetForm(form)
      },

      error:err => {console.log(err)}
    })
  }

}
