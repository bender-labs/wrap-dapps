import { Token } from '@wrap-dapps/api';
// @ts-ignore
import defaultIcon from '../default.png';

type Props = {
  tokenMetadata: Token;
};

export const EthereumTokenIcon = (props: Props) => {
  return (
    <img
      style={{ width: 28, height: 28, marginRight: 5, verticalAlign: 'middle' }}
      src={`${process.env.PUBLIC_PATH}icons/ethereum/${props.tokenMetadata.ethereumContractAddress}.png`}
      alt={''}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = defaultIcon;
      }}
    />
  );
};