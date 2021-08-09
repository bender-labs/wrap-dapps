import { SvgIconProps } from '@material-ui/core';
// @ts-ignore
import { default as Tezos } from './xtz.svg';

const Icon = (props: SvgIconProps) => (
  <img src={Tezos} />
);
export default Icon;

