import * as React from "react";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import FoodBankIcon from '@mui/icons-material/FoodBank';
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { accessTokenState, searchBarVisible, searchRecipeState } from "atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

import { signIn, signOut, useSession } from "next-auth/react"
import { fetchSignOutAPI } from "lib/http";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { AppDetails } from "const";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [search, setSearchRecipeState] = useRecoilState(searchRecipeState);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [token, setAccessTokenState] = useRecoilState(accessTokenState);


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!session && (
        <div>
          <a href={`/api/auth/signin`} onClick={(e) => {
            e.preventDefault()
            signIn()
          }}>
            <MenuItem onClick={handleMenuClose}>Iniciar Sesión</MenuItem>
          </a>
        </div>
      )}
      {session && (
        <div>
          <Link href="/me">
            <MenuItem>Perfil</MenuItem>
          </Link>
          <Link href="/me/recipes">
            <MenuItem>Mis Recetas</MenuItem>
          </Link>
          <a href={`/api/auth/signout`} onClick={(e) => {
            e.preventDefault()
            fetchSignOutAPI(token);
            signOut({ callbackUrl: `${window.location.origin}` });
          }}>
            <MenuItem onClick={handleMenuClose}>Salir</MenuItem>
          </a>
        </div>
      )}

    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      // anchorOrigin={{
      //   vertical: "top",
      //   horizontal: "right",
      // }}
      id={mobileMenuId}
      keepMounted
      // transformOrigin={{
      //   vertical: "top",
      //   horizontal: "right",
      // }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!session && (
        <a href={`/api/auth/signin`} onClick={(e) => {
          e.preventDefault()
          signIn()
        }}>
          <MenuItem>Iniciar Sesión</MenuItem>
        </a>
      )}
      {session && (
        <>
          <Link href="/me">
            <MenuItem>Perfil</MenuItem>
          </Link>
          <Link href="/me/recipes">
            <MenuItem>Mis Recetas</MenuItem>
          </Link>
          <a href={`/api/auth/signout`} onClick={(e) => {
            e.preventDefault()
            signOut({ callbackUrl: `${window.location.origin}` })
          }}>
            <MenuItem>Salir</MenuItem>
          </a>
        </>
      )}
    </Menu>
  );
  const submitSearch = (e: any) => {
    e.preventDefault();
    setSearchRecipeState({ search: e.target[0].value })
  };
  const [searchBar] = useRecoilState(searchBarVisible);
  useEffect(() => {
    let bar = document.getElementById("search") as HTMLInputElement;
    if (bar && bar.value) {
      bar.value = search.search;
    }
  })
  useEffect(() => {
    if (status === "authenticated") {
      setAccessTokenState(session.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" >
            {/* <FoodBankIcon fontSize="large" sx={{ display: { md: "flex" }, mr: 1 }} /> */}
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
          </Link>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 1.5,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 100,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {AppDetails.title}
            </Typography>
          </Link>
          {searchBar && (
            <form onSubmit={submitSearch}>
              <Search sx={{ ml: 0.5 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  id="search"
                  name="search"
                  placeholder="Buscar receta…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </form>)}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
                <Avatar sx={{borderColor:(theme) => theme.palette.secondary.main, borderStyle: "solid"}}>
                  {status === "authenticated" && session ?
                    <>
                      {session.user.image !== null && session.user.image !== undefined ?
                        <>
                          {session.user.name !== null && session.user.name !== undefined ?
                            <Image src={session.user.image} alt={session.user.name} layout="fill" /> :
                            <Image src={session.user.image} alt="Usuario" layout="fill" />
                          }
                        </> :
                        null}

                    </>
                    :
                    <AccountCircle />
                  }
                </Avatar>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Avatar  sx={{borderColor:(theme) => theme.palette.secondary.main, borderStyle: "solid"}}>
                {status === "authenticated" && session ?
                  <>
                    {session.user.image !== null && session.user.image !== undefined ?
                      <>
                        {session.user.name !== null && session.user.name !== undefined ?
                          <Image src={session.user.image} alt={session.user.name} fill /> :
                          <Image src={session.user.image} alt="Usuario" fill />
                        }
                      </> :
                      null}

                  </>
                  :
                  <MoreIcon />
                }
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
