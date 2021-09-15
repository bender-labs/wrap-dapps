import defaultIcon from '../default.png';

type Props = {
  url: string;
  width: number;
  height: number;
};

export const TezosTokenIcon = (props: Props) => {
  return (
    <img style={{ width: props.width, height: props.height, marginRight: 5, verticalAlign: 'middle' }}
         src={`https://cloudflare-ipfs.com/ipfs/${
           props.url ? props.url.replace('ipfs://', '') : ''
         }`}
         alt={''}
         onError={(e: any) => {
           e.target.onerror = null;
           e.target.src = defaultIcon;
         }}
    />
  );
};
