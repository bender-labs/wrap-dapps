import { styled } from '@material-ui/core';
import Button, {
    buttonClasses,
} from '@material-ui/core/Button';

const CustomButton = styled(Button)(({theme}) => ({
    [`&.${buttonClasses.root}`]: {
        textTransform: 'none',
        boxShadow: 'none',
        fontWeight: 900,
        borderRadius: '25px',
        border: 'none',
        '&:hover': {
            border: 'none',
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.main,
        },
    },
    [`&.${buttonClasses.disabled}`]:{
        backgroundColor: theme.palette.primary.main,
    }
}));

export default CustomButton;