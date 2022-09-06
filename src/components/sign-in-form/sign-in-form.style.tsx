import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;

  .title {
    margin: 10px 0;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;
  }

  input[type='password'] {
    letter-spacing: 0.3em;
    background-color: rgb(202, 248, 233);
  }

  input[type='email'] {
    background-color: rgb(202, 248, 233);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`