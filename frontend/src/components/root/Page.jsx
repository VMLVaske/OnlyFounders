import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Page = (props) => {
  return (
    <>
    <Container className='page'>
      <Row>
        <h1>{props.heading}</h1>
      </Row>
      <Row>
        {props.content}
      </Row>
    </Container>
    </>
  );
}

export default Page;