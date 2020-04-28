import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';
import { PriceQueryFetched } from './price-query.actions';

export function filterPriceDataByDate(action: PriceQueryFetched): PriceQuery[]{
  action.dateObject.endDate.setDate(action.dateObject.endDate.getDate() + 1);
  return transformPriceQueryResponse(action.queryResults).filter(result => 
    new Date(result.date) >= new Date(action.dateObject.startDate) && new Date(result.date) <= new Date(action.dateObject.endDate)
  );
}

export function transformPriceQueryResponse(
  response: PriceQueryResponse[]
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
