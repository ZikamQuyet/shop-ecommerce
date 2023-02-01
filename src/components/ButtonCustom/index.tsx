import React, { ButtonHTMLAttributes } from 'react'
import ButtonStyles from './ButtonStyles.styled'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | undefined
  width?: string
  height?: string
  padding?: string
  bgColor?: string
  border?: string
  borderRadius?: string
  to?: string
  onClick?: any
  isLoading?: boolean
  zIndex?: string
  children: any
}
const ButtonCustom: React.FC<IButton> = ({
  type,
  width,
  height,
  padding,
  bgColor,
  border,
  borderRadius,
  to,
  onClick = () => {},
  zIndex,
  children,
  isLoading
}) => {
  return (
    <ButtonStyles
      bgColor={bgColor}
      width={width}
      height={height}
      border={border}
      padding={padding}
      borderRadius={borderRadius}
      type={type}
      onClick={onClick}
      isLoading={isLoading}
      zIndex={zIndex}
    >
      {children}
    </ButtonStyles>
  )
}

export default ButtonCustom
