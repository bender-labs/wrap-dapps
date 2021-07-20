import { SupportedBlockchain } from '../../wallet/blockchain';
import { TokenMetadata } from '../../token/type';
import TokenSelection from '../../token/TokenSelection';

type EthereumTokenSelectionProps = {
  token: TokenMetadata;
  onTokenChange: (t: string) => void;
  tokens: Record<string, TokenMetadata>;
};

export default function EthereumTokenSelection({
  token,
  onTokenChange,
  tokens,
}: EthereumTokenSelectionProps) {
  return (
    <TokenSelection
      token={token.ethereumSymbol}
      onTokenSelect={onTokenChange}
      blockchainTarget={SupportedBlockchain.Ethereum}
      tokens={tokens}
    />
  );
}
