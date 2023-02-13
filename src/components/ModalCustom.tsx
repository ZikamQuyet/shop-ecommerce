import React, { ReactNode } from 'react';
import { Box, Modal } from '@mui/material';
interface IModalCustom {
  open: boolean
  handleClose: () => void
  children: ReactNode
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 5,
  p: 4
}
const ModalCustom: React.FC<IModalCustom> = ({ open, handleClose, children }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  )
}

export default ModalCustom
