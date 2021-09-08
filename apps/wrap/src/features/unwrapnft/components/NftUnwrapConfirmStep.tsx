import {
  LabelAndAsset,
  LabelAndValue,
  PaperActions,
  PaperContent,
  PaperHeader,
  PaperNav,
  PaperTitle
} from '@wrap-dapps/components';
import { CardMedia, Checkbox, Container, IconButton, styled, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import BigNumber from 'bignumber.js';
import { wrapERC721Fees } from '@wrap-dapps/features';
import { Fees } from '@wrap-dapps/api';
import { NftInstance } from '../../nft/api/types';
import { NftUnwrapStatus } from '../hooks/reducer';
import { NftUnwrapActions } from './NftUnwrapActions';

const Description = styled(Typography)(() => ({
  paddingLeft: '20px',
  fontWeight: 'bold'
}));

// const PaperContentWithBackground = styled(PaperContent)(() => ({
//   backgroundColor: '#C4C4C4'
// }));

export type NftUnwrapConfirmStepProps = {
  fees: Fees;
  sendingAddress: string;
  recipientAddress: string;
  onPrevious: () => void;
  networkFees: BigNumber;
  status: NftUnwrapStatus;
  onWrap: () => void;
  onAgreementChange: (v: boolean) => void;
  nftInstance: NftInstance | null;
};

export function NftUnwrapConfirmStep({
                                       onPrevious,
                                       fees,
                                       status,
                                       sendingAddress,
                                       recipientAddress,
                                       onWrap,
                                       networkFees,
                                       onAgreementChange,
                                       nftInstance
                                     }: NftUnwrapConfirmStepProps) {
  const currentFees = wrapERC721Fees(fees);

  const [checked, setChecked] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    onAgreementChange(e.target.checked);
  }

  React.useEffect(() => {
    const check =
      status === NftUnwrapStatus.READY_TO_UNWRAP ||
      status === NftUnwrapStatus.WAITING_FOR_UNWRAP;
    setChecked(check);
    setDisabled(check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth='xs'>
      <PaperHeader>
        <PaperNav>
          <IconButton onClick={onPrevious}>
            <ArrowBackIcon />
          </IconButton>
        </PaperNav>
        <PaperTitle>Confirm NFT unwrap</PaperTitle>
        <PaperActions />
      </PaperHeader>
      <PaperContent>
        {nftInstance &&
        <CardMedia sx={{
          height: 0,
          backgroundImage: '100%',
          paddingTop: '100%'
        }} image={nftInstance.thumbnailUri} title={nftInstance.name}
        />}
        <LabelAndValue label={'Collection'} value={nftInstance?.nftCollection.ethereumName} />
        <LabelAndValue label={'Name'} value={nftInstance?.name} />
        <LabelAndValue label={'From'} value={sendingAddress} />
        <LabelAndValue label={'To'} value={recipientAddress} />
      </PaperContent>
      <PaperContent alternate={true}>
        <Description variant={'body2'}>
          Fees
        </Description>
        <LabelAndAsset
          label={'Wrap fees'}
          decimals={6}
          value={currentFees}
          symbol='XTZ'
        />
        <LabelAndAsset
          label={'Network fees (est.)'}
          decimals={6}
          value={networkFees}
          symbol={'XTZ'}
          emptyState={networkFees.isNaN() || networkFees.lte(0)}
          emptyStatePlaceHolder={'Awaiting agreement'}
        />
      </PaperContent>
      <PaperContent style={{ display: 'flex', padding: '20px 26px 0px 26px' }}>
        <Checkbox
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />
        <Typography variant={'caption'}>
          I acknowledge the fees and that this transaction will require ETH to
          finalize minting
        </Typography>
      </PaperContent>
      <NftUnwrapActions onUnwrap={onWrap} status={status} />
    </Container>
  );
}
