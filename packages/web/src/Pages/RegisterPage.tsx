import React from 'react';
import Styled from 'styled-components';

const PageContainer = Styled.div`
    width: 100vw;
    height: 100vh;

    max-width: 100vw;
    max-height: 100vh;
`;

const RegisterPage: React.FunctionComponent = () => {
    return (
        <PageContainer>
            <h2>Register Page</h2>
        </PageContainer>
    );
};

export default RegisterPage;
