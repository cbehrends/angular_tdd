import {Renderedservice} from './renderedservice';

export interface IClaim {
  id: number;
  firstName: string;
  servicesRendered: Renderedservice[];
}
