import { SvgIconProps } from '@mui/material';
// @ts-ignore
import { default as Eth } from './eth.svg';

const Icon = (props: SvgIconProps) => (
  <img src={Eth} />
);
export default Icon;
