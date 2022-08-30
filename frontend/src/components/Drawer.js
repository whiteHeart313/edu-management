import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {
  Ballot,
  PersonRemove,
  PersonAdd,
  AssignmentTurnedIn,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "@mui/icons-material";
import ListComp from "./listComp";
import AccordionListItem from "./accordionListItem";
import UserRutes from "./userRoutes";
import MyDrawer from "./myDrawer";
import AppBar from "./AppBar";

const icons = [
  <AssignmentTurnedIn />,
  <PersonAdd />,
  <PersonRemove />,
  <Ballot />,
];
const pages = ["", "add", "delete", " "];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            الــطــمــلاوي
          </Typography>
        </Toolbar>
      </AppBar>
      <MyDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["غياب", "اضافه طالب", "حذف طالب", "الامتحانات"].map(
            (text, index) => {
              if (text !== "غياب") {
                return (
                  <ListComp
                    text={text}
                    icon={icons[index]}
                    open={open}
                    page={pages[index]}
                  />
                );
              } else {
                return <AccordionListItem icons={icons} open={open} />;
              }
            }
          )}
        </List>
        <Divider />
      </MyDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <UserRutes />
      </Box>
    </Box>
  );
}
