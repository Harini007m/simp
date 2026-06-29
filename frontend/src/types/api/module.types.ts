export interface Module {
  id: string;
  code: string;
  name: string;
  route: string;
  active: boolean;
  desc?: string;
}
export const ROUTE_MODULE_MAP: Record<string, string> = {};
