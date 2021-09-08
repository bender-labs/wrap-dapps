import { Box, StepIconProps } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { white, yellow } from '../theme/theme';

export default function CustomStepIcon(props: StepIconProps) {
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: completed ? <CheckIcon /> : <span>1</span>,
    2: completed ? <CheckIcon /> : <span>2</span>
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        color: '#000',
        fontWeight: 900,
        width: 32,
        height: 32,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...active && { backgroundColor: white },
        ...completed && { backgroundColor: yellow }
      }}
    >
      {icons[String(props.icon)]}
    </Box>
  );
}
