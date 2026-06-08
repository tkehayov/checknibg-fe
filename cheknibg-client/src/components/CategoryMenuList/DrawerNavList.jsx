import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
  Box,
  IconButton,
  Link,
  Collapse,
  ListSubheader,
} from "@mui/material";
import { ReactComponent as Logo } from "../../assets/images/CHEKNI-LOGO.svg";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import TvIcon from "@mui/icons-material/TvOutlined";
import SmartphoneIcon from "@mui/icons-material/SmartphoneOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAltOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LaptopIcon from "@mui/icons-material/LaptopOutlined";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DevicesIcon from "@mui/icons-material/Devices";
import WatchIcon from "@mui/icons-material/Watch";
import MonitorIcon from "@mui/icons-material/Monitor";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MouseIcon from "@mui/icons-material/Mouse";
import MemoryIcon from "@mui/icons-material/Memory";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { useState } from "react";
import { PAGES_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const categoryIconMap = {
  laptops: <LaptopIcon />,
  pc: <DevicesIcon />,
  tablets: <TabletMacIcon />,
  smartphones: <SmartphoneIcon />,
  watches: <WatchIcon />,
  audio: <HeadsetMicIcon />,
  monitors: <MonitorIcon />,
  tv: <LiveTvIcon />,
  peripheral: <MouseIcon />,
  components: <MemoryIcon />,
  accessories: <BusinessCenterIcon />,
};

const FallbackIcon = <DescriptionIcon />;

export function DrawerNavList({ pages, open, toggleDrawer, selectedCategory }) {
  const navigate = useNavigate();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleClick = (index) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the state for the clicked index
    }));
  };

  const navigateToPage = (categoryId, alias, itemId) => {
    let currentCategory = {
      id: categoryId,
    };

    if (itemId === 0) {
      navigate(PAGES_URL.category + `/${alias}`);
      navigate(0);
      toggleDrawer(false)();

      return;
    }
    selectedCategory(currentCategory);

    navigate(PAGES_URL.category + `/${alias}`, {
      state: { filters: itemId },
    });
    toggleDrawer(false)();
  };
  const DrawerList = (
    <Box role="presentation">
      {/* LOGO AND CLOSE BUTTON */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link href="/" onClick={() => toggleDrawer(false)()}>
            <Logo style={{ height: "60px", width: "auto" }} />
          </Link>
        </Box>
        <IconButton onClick={() => toggleDrawer(false)()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {pages.map((page, index) => (
          <div key={index}>
            <ListItem key={page.main} disablePadding>
              <ListItemButton onClick={() => handleClick(index)}>
                <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
                  {categoryIconMap[page.alias] ?? FallbackIcon}
                </ListItemIcon>
                <ListItemText primary={page.main} />
                {page.sub &&
                  (openSubMenus[index] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            <Divider />
            {page.sub && ( // Only render Collapse if there are sub-items
              <Collapse in={openSubMenus[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {page.sub.map((subCategory, subCatIndex) => (
                    <Box key={`sub-cat-${subCatIndex}`} sx={{ pl: 2 }}>
                      <ListSubheader disableSticky sx={{ pl: 0 }}>
                        {subCategory.title}
                      </ListSubheader>
                      {subCategory.items.map((item, itemIndex) => (
                        <ListItem
                          key={`item-${subCatIndex}-${itemIndex}`}
                          disablePadding
                        >
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() =>
                              navigateToPage(page.id, page.alias, item.id)
                            }
                          >
                            {/* Indent sub-items, close drawer on click */}
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </Box>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleDrawer(false)()}
      PaperProps={{
        sx: {
          width: "100%",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}
