import { SupportedBlockchain } from '../../../wallet/blockchain';
import { TokenMetadata } from '../../../token/type';
import TokenSelection from '../../../token/TokenSelection';

type EthereumTokenSelectionProps = {
  token: TokenMetadata;
  onTokenChange: (t: string) => void;
  disabled: boolean;
  tokens: Record<string, TokenMetadata>;
};

export default function EthereumTokenSelection({
  token,
  onTokenChange,
  disabled,
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
