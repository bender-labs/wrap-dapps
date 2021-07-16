import {StepConnector, Theme} from '@material-ui/core';
import theme from '../theme/theme';
import styled from '@emotion/styled';

const CustomConnector = styled(StepConnector)`
${({theme: Theme}) => `
alternativeLabel: {
        top: 14,
    },
    active: {
        line: {
            backgroundColor: ${theme.palette.primary.main},
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
    },
`
}
`

export default CustomConnector;