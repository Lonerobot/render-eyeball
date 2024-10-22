
import styled from 'styled-components';
import { COLORS } from '../theme';  

const HorizontalDiv = styled.div`
  display: flex;
  align-items: center; 
  gap: 12px;
`;

const LabelText = styled.p`
    background-color: ${(props) => props.bgColor || 'transparent'};
    color: ${(props) => props.color || 'white'};
`;

const SwatchDiv = styled.div`
    background-color: ${(props) => props.bgColor || 'white'};
    color: ${(props) => props.color || 'black'};
    border-radius: 2px;
    width: 24px;
    height:24px;
`;

const KeyLabel = () => {
    return (
        <HorizontalDiv>
            <LabelText color={COLORS.backgroundOccupied}>Occupied</LabelText>
            <SwatchDiv bgColor={COLORS.backgroundOccupied}></SwatchDiv>
            <LabelText color={COLORS.backgroundFree}>Free</LabelText>
            <SwatchDiv bgColor={COLORS.backgroundFree}></SwatchDiv>
        </HorizontalDiv>
    );
};

export default KeyLabel;