import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { CONSTANTS } from './stocks.constant';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  private subscription: any;
  private stockPickerForm: FormGroup;
  private symbol: string;
  private period: string;
  public timePeriods = CONSTANTS.timePeriods;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {}

  ngOnInit() {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
    this.subscription = this.stockPickerForm.valueChanges.pipe(
      debounceTime(CONSTANTS.DEBOUNCE_TIME)).subscribe(value => {
      if (this.stockPickerForm.valid) {
        const { symbol, period } = value;
        this.priceQuery.fetchQuote(symbol, period);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
