import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

interface props {
    isLoaded: boolean,
    children: React.ReactNode
}

const SpinnerCallback = (props: props) => {
    const { isLoaded, children } = props

    if(isLoaded) {
        return children
    } else {
        return (
            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }
}

export default SpinnerCallback