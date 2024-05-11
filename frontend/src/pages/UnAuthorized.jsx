import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/LoginPageComponents/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import getLPTheme from '../pages/getLPTheme';

function UnAuthorized() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <NavBar mode={mode} toggleColorMode={toggleColorMode} />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h2">
                        401 Unauthorized
                    </Typography>
                    <p>You do not have the necessary permissions to view this page.</p>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default UnAuthorized;