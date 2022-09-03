import ListComp from "./listComp";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

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
          expanded={expanded === "expanded"}
          onChange={handleChange("expanded")}
        >
          <AccordionSummary
            expandIcon={
              <ListItemIcon
                sx={{
                  minWidth: 0,

                  justifyContent: "center",
                }}
              >
                {props.icons[0]}
              </ListItemIcon>
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <ListItemText primary={"الغياب"} sx={{ opacity:props.open ? 1 : 0 }} />
          </AccordionSummary>
          <AccordionDetails>
            {["مجموعه السبت", "مجموعه الاحد", "مجموعه الاثنين","الجمعه "].map((text,index) => (
               <Link style={{ textDecoration: 'none' }}  to="/" state={{ group: index+1 }} ><ListComp  text={text} icon={props.icons[0]} group={index+1} open={props.open} page={"/"} /></Link>
              
            ))}
          </AccordionDetails>
        </Accordion>
      </ListItemText>
    </ListItem>
  );
}
