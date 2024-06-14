import { Children } from "react";
interface IProps<T> {
  list: Array<T>;
  render(item: T, index?: number): JSX.Element;
}
const ForEach = <T,>({ list, render }: IProps<T>) =>
  Children.toArray(list.map((item: T, index?: number) => render(item, index)));
export default ForEach;
