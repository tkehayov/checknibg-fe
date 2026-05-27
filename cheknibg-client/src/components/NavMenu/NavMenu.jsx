import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

import { NavMenuSubMenu } from "./NavMenuSubMenu";
import { PAGES_URL } from "../../config";

/**
 * Maps category aliases (from the API) to their corresponding icon elements.
 * Add a new entry here whenever a new category alias is introduced.
 */
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

/** Fallback icon rendered when an alias has no entry in categoryIconMap. */
const FallbackIcon = <DescriptionIcon />;

export function NavMenu({ navData, handleClose }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  function handleCategoryClick(item) {
    if (item.sub?.length > 0) {
      // Has filter groups → open submenu
      setActiveItem(item);
    } else {
      // No sub-items → go straight to the category page
      navigate(PAGES_URL.category + `/${item.alias}`);
      handleClose?.();
    }
  }

  function handleFilterSelect(alias, filterId) {
    navigate(PAGES_URL.category + `/${alias}`, {
      state: { filters: filterId },
    });
    handleClose?.();
    setActiveItem(null);
  }

  function handleBack() {
    setActiveItem(null);
  }

  // ── Submenu view ──
  if (activeItem) {
    return (
      <NavMenuSubMenu
        item={activeItem}
        onBack={handleBack}
        onSelect={handleFilterSelect}
      />
    );
  }

  // ── Main category list ──
  return (
    <List disablePadding sx={{ width: "100%", bgcolor: "background.paper" }}>
      {navData.map((item) => (
        <ListItem
          key={item.id}
          disablePadding
          sx={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <ListItemButton
            onClick={() => handleCategoryClick(item)}
            sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
              {categoryIconMap[item.alias] ?? FallbackIcon}
            </ListItemIcon>

            <ListItemText
              primary={item.main}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "text.primary",
              }}
            />

            {item.sub?.length > 0 && (
              <ChevronRightIcon sx={{ color: "text.secondary" }} />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
