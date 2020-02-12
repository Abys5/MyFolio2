import React from 'react';
import Styled from 'styled-components';
import { ReactComponent as CornerHome } from '../Assets/HomeCorner.svg';

const PageContainer = Styled.div`
    max-width: 100vw;
    max-height: 100vh;

    overflow: hidden;
`;

const Corner1 = Styled(CornerHome)`
    position: relative;
    
    top: -60px;
    left: calc(100vw - 1077px);
`;

const Corner2 = Styled(CornerHome)`
    position: relative;
    
    top: calc(100vh - 1777px);
    left: -60px;

    transform: rotate(180deg);
`;

const Navbar: React.FunctionComponent = () => {
    return (
        <PageContainer>
            <Corner1></Corner1>
            <Corner2></Corner2>
        </PageContainer>
    );
};

export default Navbar;
