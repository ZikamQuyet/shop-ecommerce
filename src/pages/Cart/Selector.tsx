import React, { useEffect } from 'react'
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Skeleton, Typography } from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import { changeColor, changeSize } from '../../redux/slice/cartSlice'
import { IOption } from '../../types/product.type'

interface ISelector {
  title: 'Color' | 'Size'
  dataProduct: IOption[]
  color: string
  size: string
  id: number
}

const Selector: React.FC<ISelector> = ({ title, id, color, size, dataProduct }) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState(title === 'Color' ? color : size)
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }
  useEffect(() => {
    title === 'Color'
      ? dispatch(changeColor({ id: id, color: color, size: size, colorChange: value }))
      : dispatch(changeSize({ id: id, color: color, size: size, sizeChange: value }))
  }, [value])
  return (
    <>
      {dataProduct && (
        <FormControl>
          <Typography fontSize={14}>{title}</Typography>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value}
            defaultValue={title === 'Color' ? color : size}
            onChange={handleChange}
            size='small'
            sx={{ background: '#ccc', display: 'flex', alignItems: 'center' }}
          >
            {dataProduct?.map((item: IOption) => (
              <MenuItem value={item.value_name} key={item.value_name}>
                {title === 'Color' ? (
                  <Box width='1rem' height='1rem' bgcolor={item.value_name} display='inline-block'></Box>
                ) : (
                  item.value_name
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {!dataProduct && <Skeleton width={'100%'} />}
    </>
  )
}

export default Selector
