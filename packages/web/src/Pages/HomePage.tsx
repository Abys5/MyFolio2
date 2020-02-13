import React from 'react';
import Styled from 'styled-components';
import RightHandMenu from '../components/RightHandMenu';
import BackgroundImg from '../Assets/Group 5.png';
import Logo from '../Assets/MyFolio.png';

const PageContainer = Styled.div`
    width: 100vw;
    height: 100vh;

    max-width: 100vw;
    max-height: 100vh;

    background-image: url('${BackgroundImg}');
    background-size: calc(100vw + 180px) calc(100vh + 130px);
    background-position: -51px -43px;
    background-repeat: no-repeat;

    overflow: hidden;
`;

const CenterLogo = Styled.img`
    width: 24vw;
    position:absolute;
    top:0; left:0; right:0; bottom:0;
    margin:auto;

`;

const TextBox = Styled.div`

    position: absolute;
    z-index: 5;
    width: 300px;
    height: 180px;
    background: #F8F8F8;
    border-radius: 5px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    text-align: center;

    bottom: 80px;
    right: 80px;

    & h3 {
        color: #FF8000;
    }

    & p {
        color: #6E6E6E;
        font-size: 60%;
        padding: 5px 15%;
        padding-bottom: 20px;
    }

    & a {
        color: white;
        background: #FF8000;
        border-radius: 15px;
        margin-top: 20px;
        padding: 5px 20px;
        
    }

`;

const HomePage: React.FunctionComponent = () => {
    return (
        <PageContainer>
            <RightHandMenu />
            <CenterLogo alt="MyFolio Logo" src={Logo}></CenterLogo>
            <TextBox>
                <h3>Join For Free</h3>
                <p>
                    This Service is free to use and doesn't require any payment
                    information
                </p>
                <a href="/register">Join Now</a>
            </TextBox>
        </PageContainer>
    );
};

export default HomePage;
