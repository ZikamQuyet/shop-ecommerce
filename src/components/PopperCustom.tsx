import * as React from 'react';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
interface IPopperCustom {
  handleToggle: () => void
}
const PopperCustom: React.FC<IPopperCustom> = ({ handleToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState<PopperPlacementType>()

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper1.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default PopperCustom
