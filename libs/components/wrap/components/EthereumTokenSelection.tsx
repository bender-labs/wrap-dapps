import { SupportedBlockchain } from '../../wallet/blockchain';
import TokenSelection from '../../token/TokenSelection';
import { Token } from '@wrap-dapps/api';

type EthereumTokenSelectionProps = {
  token: Token;
  onTokenChange: (t: string) => void;
  disabled?: boolean;
  tokens: Record<string, Token>;
};

export default function EthereumTokenSelection({
  token,
  onTokenChange,
  disabled=false,
  tokens,
}: EthereumTokenSelectionProps) {
  return (
    <TokenSelection
      token={token.ethereumSymbol}
      disabled={disabled}
      onTokenSelect={onTokenChange}
      blockchainTarget={SupportedBlockchain.Ethereum}
      tokens={tokens}
    />
  );
}
