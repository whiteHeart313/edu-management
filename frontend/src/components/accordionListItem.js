import ListComp from "./listComp";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";
import listComp from "./listComp";
import ListItem from "@mui/material/ListItem";

export default function AccordionListItem(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ListItem
      //   onClick={() => navigate()}
      key={"text"}
      disablePadding
      sx={{ display: "block" }}
    >
      <ListItemText>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={
              <ListItemIcon
                sx={{
                  minWidth: 0,

                  justifyContent: "center",
                }}
              >
                {props.icons[1]}
              </ListItemIcon>
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <ListItemText primary={"الغياب"} sx={{ opacity:props.open ? 1 : 0 }} />
          </AccordionSummary>
          <AccordionDetails>
            {["مجموعه السبت", "مجموعه الاحد", "جموعه الاثنين"].map((text) => (
              <ListComp text={text} icon={props.open[0]} open={props.open} page={"/"} />
            ))}
          </AccordionDetails>
        </Accordion>
      </ListItemText>
    </ListItem>
  );
}
