import React from 'react';
import Styled from 'styled-components';
import BackgroundImg from '../Assets/Group 5.png';
import Logo from '../Assets/MyFolio.png';
import { ReactComponent as MenuSvg } from '../Assets/Icons/HamburgerMenu.svg';

const PageContainer = Styled.div`
    width: 100vw;
    height: 100vh;

    background-image: url('${BackgroundImg}');
    background-size: 120% 120%;
    background-position: calc(-4vw) calc(-6vh) ;
    background-repeat: no-repeat;

    overflow: hidden;
`;

const CenterLogo = Styled.img`
    width: 30vw;
    position:absolute;
    top:0; left:0; right:0; bottom:0;
    margin:auto;

`;

const MenuIcon = Styled(MenuSvg)`
    width: 40px;
    height: 40px;
`;

const MenuButton = Styled.button`
    outline: none;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;

    transition: 0.075s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const Navbar: React.FunctionComponent = () => {
    return (
        <PageContainer>
            <MenuButton>
                <MenuIcon />
            </MenuButton>
            <CenterLogo src={Logo}></CenterLogo>
        </PageContainer>
    );
};

export default Navbar;
