import { styled } from '@material-ui/core';
import StepConnector, {
  stepConnectorClasses,
} from '@material-ui/core/StepConnector';

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 14,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
}));

export default CustomConnector;
