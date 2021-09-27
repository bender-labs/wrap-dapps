import React, { useState } from 'react';
import { LabelAndAsset, LabelAndValue, PaperContent } from '@wrap-dapps/components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography
} from '@mui/material';
import { WrapStackingContractInfoProps } from '../types';
import { WrapStackingFeesInfo } from './WrapStackingFeesInfo';

export function WrapStackingContractInfo({ stacking, wrapStackingOwnerInfos }: WrapStackingContractInfoProps) {

  const [showFeesModal, setShowFeesModal] = useState(false);

  const closeModal = () => setShowFeesModal(false);

  const feesModal = () => {
    return (
      <Dialog
        open={showFeesModal}
        onClose={() => closeModal()}
        maxWidth='xs'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'
                     sx={{ backgroundColor: '#E5E5E5', borderBottom: '1px solid rgb(196,196,196)', padding: 2 }}>
          <Typography align={'center'} sx={{ fontSize: 20, fontWeight: 700 }}>Fees levels applicable on
            withdrawals</Typography>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#E5E5E5' }}>
          <DialogContentText>
            <Typography sx={{ fontSize: 14, paddingTop: 2 }} component='span'>Fees level are determined from the stake's block number. Each stake can be
              withdrawn separately and/or partially.</Typography>
          </DialogContentText>
          <WrapStackingFeesInfo fees={stacking.fees} />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E5E5E5', padding: 2 }}>
          <Button onClick={() => {
            closeModal();
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <PaperContent alternate>
      <LabelAndValue
        label={'Stacking contract'}
        value={
          <Link
            target={'_blank'}
            color={'textSecondary'}
            rel={'noreferrer'}
            href={`${stacking.stackingContractLink}`}
          >
            {stacking.stackingContract}
          </Link>
        }
      />
      <LabelAndAsset
        label={'Total staked'}
        emptyState={wrapStackingOwnerInfos.loading}
        emptyStatePlaceHolder={'Loading…'}
        value={wrapStackingOwnerInfos.totalSupply}
        decimals={8}
        symbol={'$WRAP'}
      />
      <LabelAndAsset
        label={'Your current share'}
        value={wrapStackingOwnerInfos.staked}
        emptyState={wrapStackingOwnerInfos.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={8}
        symbol={'$WRAP'}
      />
      <LabelAndAsset
        label={'Your pending reward'}
        value={wrapStackingOwnerInfos.reward}
        emptyState={wrapStackingOwnerInfos.loading}
        emptyStatePlaceHolder={'Loading…'}
        decimals={stacking.reward.decimals}
        symbol={'$WRAP'}
      />
      <LabelAndValue
        label={'Fees'}
        value={
          <Link color={'textSecondary'} onClick={() => setShowFeesModal(true)} sx={{ cursor: 'pointer' }}>show fees
            details</Link>
        }
      />
      {feesModal()}
    </PaperContent>
  );
}
