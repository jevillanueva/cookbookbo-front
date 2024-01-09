import { Paper, Typography } from "@mui/material";
import Link from "next/link";

export default function FooterBar(){
    return (
        <Paper sx={{
            marginTop: 'calc(10% + 60px)',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#00000008',
        }} component="footer" square >
            <Typography sx={{ padding: '0' }} variant="caption" align="left" color="text.secondary" component="p">
                <a href="/page/privacy-policy" target="_blank" rel="noopener noreferrer">| Privacy policy </a>
                <Link href="/page/terms-of-service" target="_blank" rel="noopener noreferrer">| Terms of service </Link>
                <Link href="/page/about-us" target="_blank" rel="noopener noreferrer">| About Us </Link>
                <a href="https://github.com/jevillanueva/cookbookbo-front" target="_blank" rel="noopener noreferrer">| GitHub </a>
                <a href="mailto:me@jevillanueva.dev" >| Contact Us </a>
                {` | ${new Date().getFullYear()} `}
            </Typography>
        </Paper>
    );
}