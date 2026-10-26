import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Paper,
  Drawer,
  List,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";

const pets = [
  {
    name: "Buddy",
    type: "Dog",
    age: "2 years",
    location: "Guntur",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Luna",
    type: "Cat",
    age: "1 year",
    location: "Vijayawada",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Max",
    type: "Dog",
    age: "3 years",
    location: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Milo",
    type: "Cat",
    age: "8 months",
    location: "Amaravati",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rocky",
    type: "Dog",
    age: "4 years",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Coco",
    type: "Rabbit",
    age: "1 year",
    location: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [favoritePets, setFavoritePets] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePet, setActivePet] = useState(null);
  const [donationOpen, setDonationOpen] = useState(false);
  const [applicationHref, setApplicationHref] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.type.toLowerCase().includes(search.toLowerCase()) ||
      pet.location.toLowerCase().includes(search.toLowerCase())
  );

  const scrollTo = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const toggleFavorite = (petName) => {
    setFavoritePets((currentFavorites) =>
      currentFavorites.includes(petName)
        ? currentFavorites.filter((name) => name !== petName)
        : [...currentFavorites, petName]
    );
  };

  const prepareApplication = (event) => {
    event.preventDefault();
    if (!activePet) return;
    const subject = `Adoption application for ${activePet.name}`;
    const body = `Hello,\n\nI would like to learn more about adopting ${activePet.name}.\n\nName: ${applicantName}\nEmail: ${applicantEmail}`;
    setApplicationHref(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
  };

  const openApplication = (pet) => {
    setActivePet(pet);
    setApplicantName("");
    setApplicantEmail("");
    setApplicationHref("");
  };

  return (
    <Box className="app">
      {/* Navbar */}
      <AppBar position="sticky" elevation={0} className="navbar">
        <Toolbar className="nav-container">
          <Box className="logo">
            <PetsIcon />
            <Typography variant="h6">PawFind</Typography>
          </Box>

          <Box className="nav-links">
            <Button color="inherit" onClick={() => scrollTo("home")}>Home</Button>
            <Button color="inherit" onClick={() => scrollTo("adoptable")}>Adopt</Button>
            <Button color="inherit" onClick={() => scrollTo("how-it-works")}>How It Works</Button>
            <Button color="inherit" onClick={() => scrollTo("about")}>About Us</Button>
          </Box>

          <IconButton
            className="mobile-menu-button"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Button
            variant="contained"
            className="nav-button"
            startIcon={<FavoriteBorderIcon />}
            onClick={() => setDonationOpen(true)}
          >
            Donate
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <List className="mobile-nav-list">
          {[
            ["Home", "home"],
            ["Adopt", "adoptable"],
            ["How It Works", "how-it-works"],
            ["About Us", "about"],
          ].map(([label, sectionId]) => (
            <ListItemButton key={sectionId} onClick={() => scrollTo(sectionId)}>
              {label}
            </ListItemButton>
          ))}
          <ListItemButton onClick={() => {
            setMobileMenuOpen(false);
            setDonationOpen(true);
          }}>
            Donate
          </ListItemButton>
        </List>
      </Drawer>

      {/* Hero */}
      <Box className="hero" id="home">
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                icon={<PetsIcon />}
                label="Find your new best friend"
                className="hero-chip"
              />

              <Typography
                variant="h1"
                className="hero-title"
              >
                Give a pet a
                <br />
                <span>loving home.</span>
              </Typography>

              <Typography className="hero-text">
                Every pet deserves a second chance at happiness.
                Find a loving companion and make a difference
                today.
              </Typography>

              <Box className="hero-buttons">
                <Button
                  variant="contained"
                  size="large"
                  className="primary-button"
                  startIcon={<PetsIcon />}
                  onClick={() => scrollTo("adoptable")}
                >
                  Find a Pet
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  className="secondary-button"
                  onClick={() => scrollTo("how-it-works")}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="hero-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80"
                  alt="Happy pets"
                  className="hero-image"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search Section */}
      <Container maxWidth="lg" className="pets-section" id="adoptable">
        <Box className="section-heading">
          <Box>
            <Typography variant="h4" className="section-title">
              Pets looking for a home
            </Typography>

            <Typography className="section-subtitle">
              Meet some wonderful pets waiting for their forever family.
            </Typography>
          </Box>

          <TextField
            placeholder="Search pets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Pet Cards */}
        <Grid container spacing={3}>
          {filteredPets.map((pet) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pet.name}>
              <Card className="pet-card">
                <Box className="pet-image-wrapper">
                  <CardMedia
                    component="img"
                    image={pet.image}
                    alt={pet.name}
                    className="pet-image"
                  />

                  <IconButton
                    className="favorite-button"
                    aria-label={`${favoritePets.includes(pet.name) ? "Remove" : "Add"} ${pet.name} ${favoritePets.includes(pet.name) ? "from" : "to"} favorites`}
                    aria-pressed={favoritePets.includes(pet.name)}
                    onClick={() => toggleFavorite(pet.name)}
                  >
                    {favoritePets.includes(pet.name) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>

                <CardContent>
                  <Box className="pet-name-row">
                    <Typography variant="h6" className="pet-name">
                      {pet.name}
                    </Typography>

                    <Chip
                      label={pet.type}
                      size="small"
                      className="pet-type"
                    />
                  </Box>

                  <Typography className="pet-age">
                    {pet.age}
                  </Typography>

                  <Box className="pet-location">
                    <LocationOnIcon fontSize="small" />
                    <Typography>{pet.location}</Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    className="adopt-button"
                    onClick={() => openApplication(pet)}
                  >
                    Adopt {pet.name}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredPets.length === 0 && (
          <Typography className="no-results">
            No pets found. Try another search.
          </Typography>
        )}
      </Container>

      {/* How It Works */}
      <Box className="how-section" id="how-it-works">
        <Container maxWidth="lg">
          <Typography variant="h4" className="section-title center">
            How adoption works
          </Typography>

          <Typography className="section-subtitle center">
            Making a new friend is easier than you think.
          </Typography>

          <Grid container spacing={4} className="steps">
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper className="step-card">
                <Box className="step-icon">
                  <SearchIcon />
                </Box>

                <Typography variant="h6">
                  1. Find a pet
                </Typography>

                <Typography>
                  Browse our available pets and find one
                  that feels like the perfect match.
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper className="step-card">
                <Box className="step-icon">
                  <FavoriteBorderIcon />
                </Box>

                <Typography variant="h6">
                  2. Apply to adopt
                </Typography>

                <Typography>
                  Submit an adoption application and tell
                  us about your future pet's new home.
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper className="step-card">
                <Box className="step-icon">
                  <PetsIcon />
                </Box>

                <Typography variant="h6">
                  3. Bring them home
                </Typography>

                <Typography>
                  Meet your new companion and give them
                  the loving home they deserve.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="footer" id="about">
        <Container maxWidth="lg">
          <Box className="footer-content">
            <Box className="logo footer-logo">
              <PetsIcon />
              <Typography variant="h6">PawFind</Typography>
            </Box>

            <Typography>
              © 2026 PawFind. Every pet deserves a home.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Dialog open={Boolean(activePet)} onClose={() => setActivePet(null)} fullWidth maxWidth="sm">
        <DialogTitle>Ask about adopting {activePet?.name}</DialogTitle>
        <Box component="form" onSubmit={prepareApplication}>
          <DialogContent className="application-form">
            <Typography className="dialog-copy">
              Enter your details to prepare an email application. This demo does not have a shelter inbox configured, so add the shelter's address in your email app before sending.
            </Typography>
            <TextField
              label="Your name"
              value={applicantName}
              onChange={(event) => setApplicantName(event.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Your email"
              type="email"
              value={applicantEmail}
              onChange={(event) => setApplicantEmail(event.target.value)}
              required
              fullWidth
            />
            {applicationHref && (
              <Alert severity="success">
                Your application draft is ready. <a href={applicationHref}>Open it in your email app</a>.
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActivePet(null)}>Cancel</Button>
            <Button type="submit" variant="contained">Prepare email</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={donationOpen} onClose={() => setDonationOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Support local pet adoption</DialogTitle>
        <DialogContent>
          <Typography className="dialog-copy">
            Online payments are not connected on this site. Please contact your local shelter directly to arrange a donation; no payment details are collected here.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDonationOpen(false)}>Close</Button>
          <Button onClick={() => {
            setDonationOpen(false);
            scrollTo("adoptable");
          }} variant="contained">Meet the pets</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;