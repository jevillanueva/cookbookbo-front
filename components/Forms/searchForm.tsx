import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export default function SearchForm(props: { submitSearch: any, idSearch: string }) {
    const { submitSearch, idSearch } = props;
    return (
        <form onSubmit={submitSearch}>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor={idSearch}>Buscar</InputLabel>
                <OutlinedInput
                    name="search"
                    id={idSearch}
                    type={'text'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                aria-label="search option"
                                edge="end"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="search"
                />
            </FormControl>
        </form>
    );
}