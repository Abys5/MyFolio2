import React from 'react';
import Styled from 'styled-components';
import { ReactComponent as MenuSvg } from '../Assets/Icons/HamburgerMenu.svg';

const Wrapper = Styled.div`
    
`;

const MenuIcon = Styled(MenuSvg)`
    width: 40px;
    height: 40px;
`;

const MenuButton = Styled.button`
    z-index: 100;
    outline: none;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;

    transition: 0.1s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }

    &:active {
        transform: scale(0.9);
    }
`;

interface MenuProps {
    open: boolean;
}

const Menu = Styled.div<MenuProps>`
    position: absolute;
    z-index: 7;
    top: 0px;
    right: 0px;
    background: #FF8000;  
    margin: 0;

    width: ${(props: MenuProps) => (!props.open ? '0px' : '20vw')};
    height: 100%;

    transition: 1s ease-in-out;
    overflow: hidden;

    color: white;

    text-align: center;

    & ul {
        list-style: none;
        padding: 0;

        & li {
            padding-top: 20px;
        }

    }



`;

const RightHandMenu: React.FunctionComponent = () => {
    let [isOpened, setIsOpened] = React.useState<boolean>(false);

    return (
        <Wrapper>
            <MenuButton onClick={() => setIsOpened(!isOpened)}>
                <MenuIcon />
            </MenuButton>
            <Menu open={isOpened}>
                <h3>Menu</h3>
                <ul>
                    <li>Home</li>
                    <li>Login</li>
                    <li>Register</li>
                </ul>
            </Menu>
        </Wrapper>
    );
};

export default RightHandMenu;
