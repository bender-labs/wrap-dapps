import {CircularProgress } from '@material-ui/core';
import {PropsWithChildren} from 'react';
import {Box} from '@material-ui/core'
import CustomButton from '../button/CustomButton';


export type LoadableButtonProps = {
    loading?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    text?: string;
    isChecked?: boolean;
    finalized?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    size?: 'small' | 'medium' | 'large';
};

export default function LoadableButton({
                                           loading,
                                           disabled,
                                           text,
                                           onClick,
                                           children,
                                           finalized,
                                           variant = 'outlined',
                                           size,
                                       }: PropsWithChildren<LoadableButtonProps>) {

    const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        onClick();
    };

    return (
        <div>
            <Box m={1} sx={{backgroundColor: '#FFFFFF',position: 'relative', borderRadius: '25px'}}>
                <CustomButton
                    variant={variant}
                    fullWidth
                    disabled={disabled || loading}
                    onClick={handleOnClick}
                    size={size} >
                    {text}
                </CustomButton>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12,
                            zIndex: 99
                        }}/>
                )}
            </Box>
            {children}
        </div>
    );
}
