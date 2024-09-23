import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
  component="footer"
  sx={{
    width: '100%',
    bgcolor: '#1976d2',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    marginTop: "10px",
    paddingTop: "10px",
    height: '60px' // Asegúrate de definir una altura
  }}
>
      <Typography variant="body2">© 2024 Dynamic Forms App. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
