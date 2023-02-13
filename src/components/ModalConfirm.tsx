import React, { ReactNode } from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
interface IModalConfirm {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void
  handleCloseCartMini?: () => void
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
const ModalConfirm: React.FC<IModalConfirm> = ({ open, handleClose, handleConfirm, handleCloseCartMini = () => {} }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Stack alignItems={'center'} gap={2}>
            <Typography>Bạn có muốn xóa</Typography>
            <Stack direction={'row'} gap={2}>
              <Button
                variant='contained'
                onClick={() => {
                  handleConfirm()
                  handleClose()
                  handleCloseCartMini()
                }}
              >
                Có
              </Button>
              <Button variant='outlined' onClick={handleClose}>
                Không
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default ModalConfirm
