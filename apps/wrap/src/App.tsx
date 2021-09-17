import React, { useEffect, useState } from 'react';
import { AppRoute, TezosStateType, useConfig } from '@wrap-dapps/components';
import { useTezosWalletContext } from '@wrap-dapps/features';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { FARMING_ROOT, paths, routes } from './pages/routes';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import useBalances from './features/fees_farming/useBalances';
import BigNumber from 'bignumber.js';

const App = () => {
  const { state: tezosState, tezosAccount } = useTezosWalletContext();
  const buildRoutes = (routes: AppRoute[]): JSX.Element[] => {
    return routes.map((route) => (<Route exact path={route.path} component={route.component} key={route.path} />));
  };
  const [showOldFarmModal, setShowOldFarmModal] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const { oldFarms } = useConfig();
  const { balances } = useBalances();

  useEffect(() => {
    if (!location.pathname.startsWith(paths.FARMING_ROOT) && tezosState.type === TezosStateType.CONNECTED && tezosAccount()) {
      if (!balances.isDirty) {
        setShowOldFarmModal(balances.balances.filter(b => new BigNumber(b.balance).isGreaterThan(0, 10)).reduce((total, currentBalance) => {
          if (oldFarms.findIndex(oldFarm => oldFarm.farmContractAddress === currentBalance.contract) !== -1) {
            total = total.plus(currentBalance.balance, 10);
          }
          return total;
        }, new BigNumber(0, 10)).isGreaterThan(0, 10));
      }
    }
  }, [tezosState, tezosAccount, balances, oldFarms]);

  const closeModal = () => setShowOldFarmModal(false);

  return (
    <>
      <Switch>
        {buildRoutes(routes)}
        <Route path='/farming'>
          <Redirect to={FARMING_ROOT} />
        </Route>
        <Route path='*'>
          <Redirect to='/wrap' />
        </Route>
      </Switch>
      <Dialog
        open={showOldFarmModal}
        onClose={() => closeModal()}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' sx={{ backgroundColor: 'white', padding: 4 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 900 }}>You need to unstake from old farms!</Typography>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'white', padding: 4 }}>
          <DialogContentText id='alert-dialog-description' sx={{ paddingBottom: 2 }}>
            We detect that you still have funds staked on old farms and/or rewards to claim. Those farms are empty and
            deactivated. It means
            that your staked $WRAP no longer yields any returns.
          </DialogContentText>
          <DialogContentText id='alert-dialog-description' sx={{ paddingBottom: 2 }}>
            Please click on the button below to go on our dedicated interface to unstake from those old farms. If you
            had any pending rewards, please do claim them as well.
          </DialogContentText>
          <DialogContentText id='alert-dialog-description' sx={{ paddingBottom: 2 }}>
            You will find the new farms in the dedicated section afterwards.
          </DialogContentText>
          <DialogContentText id='alert-dialog-description'>
            If you just unstaked from old farms, this message may show again while waiting for the Tezos blockchain to
            update.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'white', padding: 4 }}>
          <Button onClick={() => {
            history.push(paths.OLD_ALL_FARMS_UNSTAKE);
            closeModal();
          }}>
            Unstake from old farms
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
