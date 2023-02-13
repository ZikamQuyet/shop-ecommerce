import { useState } from 'react'

const useToggle = (): {
  isOpen: boolean
  handleOpen: () => void
  handleClose: () => void
  handleToggle: () => void
} => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleToggle = () => setIsOpen(!isOpen)
  return { isOpen, handleOpen, handleClose, handleToggle }
}

export default useToggle
