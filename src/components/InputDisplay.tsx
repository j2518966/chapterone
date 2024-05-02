import React, { useState, ReactNode, useEffect } from 'react';
import { Card, FormControl, Button, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import {userData} from "../services/Helper";

type Status = {
  id: string;
  statusText: ReactNode;
};

const InputDisplay = () => {
  const [input, setInput] = useState('');
  const [displays, setDisplays] = useState<Status[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };


  const handleDisplay = () => {
    let newDisplay: ReactNode;
    if (input.startsWith('http') && (input.endsWith('.jpg') || input.endsWith('.png'))) {
      newDisplay = <img src={input} alt="User input" />;
    } else {
      newDisplay = input;
    }
    setDisplays(prevDisplays => [...prevDisplays, { id: Date.now().toString(), statusText: newDisplay }]);    setInput('');

    // Send the content to localhost:8080/statuses
    console.log(userData())
    fetch('http://localhost:8080/statuses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ statusText: newDisplay, userID: userData().id })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      console.log('Success:', data);
    }).catch((error) => {
      console.error('Error:', error);
    });

  };

    useEffect(() => {
        fetch('http://localhost:8080/statuses')
        .then(response => response.json())
        .then(data => {
            setDisplays(data.map((status: { statusText: ReactNode }) => status.statusText));
        });
    }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/statuses/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setDisplays(prevDisplays => prevDisplays.filter(status => status.id !== id));
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/statuses')
        .then(response => response.json())
        .then(data => {
          setDisplays(data);
        });
  }, []);

  return (
      <Container style={{marginTop: "20px"}} className="input-display-container" >
        <Row className="justify-content-md-center" >
          <Col md={9}>
            <Form>
              <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Enter text or image URL"
                    value={input}
                    onChange={handleInputChange}
                />

                <Button onClick={handleDisplay}>Send</Button>

              </InputGroup>
            </Form>
            {[...displays].reverse().map((status, index) => (
                status && (
                    <Card style={{marginTop: "10px"}} key={index}>
                      <Card.Body>
                        {status.statusText}
                        <Button onClick={() => handleDelete(status.id)} style={{float: 'right'}}>X</Button>
                      </Card.Body>
                    </Card>
                )
            ))}
          </Col>
        </Row>
      </Container>
  );
};

export default InputDisplay;