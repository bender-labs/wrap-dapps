import { Card, CardContent, CardHeader } from '@material-ui/core';
import { SupportedBlockchain } from '../wallet/blockchain';
import { TokenMetadata } from '../token/type';
import TokenSelection from '../token/TokenSelection';

type InputCardProps = {
  token: TokenMetadata;
  connected: boolean;
  onTokenChange: (t: string) => void;
  tokens: Record<string, TokenMetadata>;
}

export default function InputCard({
  token,
  onTokenChange,
  tokens }: InputCardProps) {
  return (
    <Card>
      <CardHeader title={'Input Card'}/>
      <CardContent>
        <TokenSelection
          token={token.ethereumSymbol}
          onTokenSelect={onTokenChange}
          blockchainTarget={SupportedBlockchain.Ethereum}
          tokens={tokens}/>
      </CardContent>
    </Card>
  )
};