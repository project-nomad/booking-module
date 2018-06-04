import React from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Header = styled.span`
  display: block;
  margin: 0px;
  padding: 0px 0px 4px 0px;
  font-size: 17px;
  font-weight: 200;
`;

const MainBox = styled.div`
  display: block;
  position: relative;
  width: 100%;
  border: 1px solid #DBDBDB;
  border-radius: 2px;
  font-weight: 600;
`;

const InputBox = styled.div`
  display: inline-block;
  width: calc(50% - 12px);
  vertical-align: middle;
  position: relative;
  margin: 0px;
  padding: 8px;
  font-weight: normal;
  font-size: 17px;
  line-height: 24px;
  color: #757575;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  border: 0px;
`;

const Dates = () => (
  <MainDiv>
    <Header>Dates</Header>
    <MainBox>
      <InputBox>
        <Input type="text" placeholder="Check In" />

        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{ height: '24px', width: '24px' }}>
          <path d="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z" fillRule="evenodd" />
        </svg>

        <Input type="text" placeholder="Check Out" />
      </InputBox>
    </MainBox>
  </MainDiv>
);

export default Dates;