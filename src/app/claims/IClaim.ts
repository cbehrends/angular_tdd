import {IRenderedService} from './IRenderedService';

export interface IClaim {
  id: number;
  firstName: string;
  servicesRendered: IRenderedService[];
}
