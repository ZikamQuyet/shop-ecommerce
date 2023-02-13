import styled from 'styled-components';
import { IButton } from './index';

const ButtonStyles = styled.button<IButton>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;
  background: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => props.border};
`;

export default ButtonStyles;
