import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Button, Stack } from '@mui/material'

interface ICount {
  increment: () => void
  decrement: () => void
  quantity: number
}

const Count: React.FC<ICount> = ({ increment = () => {}, decrement = () => {}, quantity }) => {
  return (
    <Stack direction={'row'} gap={'2px'}>
      <Button variant='outlined' sx={{ minWidth: 0, padding: 0 }} onClick={decrement} disabled={quantity === 1}>
        <RemoveIcon />
      </Button>

      <Box p='0 8px' border={'1px solid #000'} borderRadius={1}>
        {quantity}
      </Box>

      <Button variant='outlined' size='small' sx={{ minWidth: 0, padding: 0 }} onClick={increment}>
        <AddIcon />
      </Button>
    </Stack>
  )
}

export default Count
