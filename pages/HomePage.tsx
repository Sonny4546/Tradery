import '../src/main.css'
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert, AlertHeading } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'wouter';

import { User } from './lib/GetUser';
import { useAuth } from './lib/AuthHook';
import { TraderyItems } from './lib/ItemsInterface';
import { getItems } from './lib/Items';
import ItemCard from './comp/ItemCard';
import HomeNav from './HomeNav';


const HomePage = () => {
  const [items, setItems] = useState<Array<TraderyItems> | undefined>();

  useEffect(() => {
    User();
    (async function run() {
      const { items } = await getItems();
      setItems(items)
      console.log(items);
    })();
  }, []);
  return (
    <HomeNav>
      <div className="home">
        <div className="container" id="pagewrap">
            <div className="searchinput">
                <form className="search">
                    <input name="keyword" placeholder="Search for Items..."></input>
                    <button>Search</button>
                </form>
            </div>
            <div className="items container">
              <Row>
                {Array.isArray(items) && items.length > 0 && (
                <>
                    {items.map((items) => {
                    return (
                        <Col xs={12} md={3} style={{ paddingBottom: '20px' }}>
                            <a className="itemLink" href={`#/Item/${items.$id}`}>
                            <ItemCard
                                // image={{
                                //   alt: '',
                                //   height: items.imageHeight,
                                //   url: items.imageUrl,
                                //   width: items.imageWidth
                                // }}
                                name={items.name}
                                date={items.date}
                                author={items.author}
                            />
                            </a>
                        </Col>
                    )
                    })}
                </>
                )}
                {Array.isArray(items) && items.length === 0 && (
                <Container>
                    <Alert key='warning' variant='warning'>
                    No Items are currently posted, 
                    <Alert.Link href="#/Dashboard/Post">You can start by posting here</Alert.Link>.
                    </Alert>
                </Container>
                )}
              </Row>
            </div>
        </div>
      </div>
    </HomeNav>
  );
}
export default HomePage