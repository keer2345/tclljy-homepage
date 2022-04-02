import { History, Location, Route } from 'umi'

export interface UmiComponentProps {
  history: History
  location: Location
  match: any
  route: Route
  routes: Route[]
  dispatch: any
  children: any
}
