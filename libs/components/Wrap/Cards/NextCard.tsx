import { Button, Card, CardContent } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

export default function NextCard() {
  return (
    <Card sx={{borderRadius: '0 0 15px 15px', minHeight: '100px'}}>
      <CardContent>

        <Button
          variant={'contained'}
          color={'primary'}
          disabled
          sx={{
            color: 'black',
            backgroundColor: '#ffffff',
            marginTop: '10px',
            width: '40%',
            borderRadius: '25px',
            float: 'right',
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 900,
            '&:active': {
              boxShadow: 'none',
            },
            '&:hover': {
              backgroundColor: yellow,
              boxShadow: 'none',
            },
            '&:disabled': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          Next →
        </Button>
      </CardContent>
    </Card>
  );
};
