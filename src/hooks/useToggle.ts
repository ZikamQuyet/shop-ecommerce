import { useState } from 'react'

const useToggle = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)
  return [isOpen, handleToggle]
}

export default useToggle
