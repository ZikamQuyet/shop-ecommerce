import { Stack, Button, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const Count = () => {
  return (
    <Stack direction={'row'} gap={'2px'}>
      <Button variant='outlined' sx={{ minWidth: 0, padding: 0 }}>
        <RemoveIcon />
      </Button>

      <Box p='0 8px' border={'1px solid #000'} borderRadius={1}>
        1
      </Box>

      <Button variant='outlined' size='small' sx={{ minWidth: 0, padding: 0 }}>
        <AddIcon />
      </Button>
    </Stack>
  )
}

export default Count
