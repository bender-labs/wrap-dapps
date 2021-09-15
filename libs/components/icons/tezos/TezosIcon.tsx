import icon from './xtz.svg';
import defaultIcon from '../default.png';

export function TezosIcon() {
  return (
    <img
      style={{ width: 50, height: 50, marginRight: 5, verticalAlign: 'middle' }}
      src={icon}
      alt={''}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = defaultIcon;
      }}
    />
  );
}
