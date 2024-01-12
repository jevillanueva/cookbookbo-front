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
                <a href="/page/privacy-policy" target="_blank" rel="noopener noreferrer" aria-label="Privacy Policy">|Privacy policy </a>
                <Link href="/page/terms-of-service" target="_blank" rel="noopener noreferrer" aria-label="Terms of service">|Terms of service </Link>
                <Link href="/page/about-us" target="_blank" rel="noopener noreferrer" aria-label="About">|About </Link>
                <a href="https://github.com/jevillanueva/cookbookbo-front" target="_blank" rel="noopener noreferrer" aria-label="GitHub">|GitHub </a>
                <a href="mailto:me@jevillanueva.dev" aria-label="Contact" >|Contact </a>
                {`|${new Date().getFullYear()}`}
            </Typography>
        </Paper>
    );
}