import { Box } from '@material-ui/core';

export function ConnectWallet() {
  return (
    <Box sx={{
      backgroundColor: '#e5e5e5',
      margin: 'auto',
      padding: '30px',
      fontSize: '20px',
      fontWeight: 'bold',
      width: '65%',
      textAlign: 'center',
      borderRadius: '10px'
    }}>
      <div>Connect at least one of your wallets</div>
    </Box>
  );
};

