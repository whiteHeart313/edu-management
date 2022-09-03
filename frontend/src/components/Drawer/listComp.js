import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate,useLocation } from "react-router-dom";


export default function ListComp(props){
  
    let navigate = useNavigate()
    const clickHndeler  = ()=>{
      if (props.group){
        return null 
      }else{
        navigate(`${props.page}`)
      }
        
    }
    return (
        <ListItem
                    onClick={() =>clickHndeler() }
                    key={props.text}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: props.open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: props.open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {props.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={props.text}
                        sx={{ opacity: props.open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
    )
}