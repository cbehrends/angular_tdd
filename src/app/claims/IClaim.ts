import {IRenderedService} from './IRenderedService';

export interface IClaim {
  id: number;
  firstName: string;
  totalAmount: number;
  amountDue: number;
  servicesRendered: IRenderedService[];
}
