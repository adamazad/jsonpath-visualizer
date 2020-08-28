import Styled from 'styled-components';

const CARD_PADDING = '20px';

const Card =  Styled.div(({ flow = false, margin = 'auto' }) => `
    border-radius: 4px;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: ${margin};
    ${flow ? 'height: 100%;' : ''}
    box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 10px;
`);

export const CardHeader = Styled.header`
    padding: ${CARD_PADDING};
`;

export const CardBody = Styled.main`
    padding: ${CARD_PADDING};
`;

export const CardImage = Styled.img`
`;

export const CardFooter = Styled.footer`
    padding: ${CARD_PADDING};
    align-self: bottom;
`;

export const CardAvatar = Styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
`;

export const CardLinks = Styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CardButtons = Styled.div(({ direction = 'column' }) => `
    display: flex;
    flex-direction: ${direction};
`);

export const CardTitle = Styled.h3``;

export default Card;