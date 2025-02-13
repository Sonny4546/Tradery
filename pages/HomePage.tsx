import '../src/main.css'
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert, CloseButton, AlertHeading } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'wouter';

import { useAuth } from './lib/AuthHook';
import { TraderyItems } from './lib/ItemsInterface';
import { getPreviewImageById } from "./lib/storage";
import { getItems } from './lib/Items';
import { getItemsbySearch } from './lib/Items';
import ItemCard from './comp/ItemCard';
import HomeNav from './HomeNav';



const HomePage = () => {
  const [items, setItems] = useState<Array<TraderyItems> | undefined>();
  const [isChecked, setIsChecked] = useState(false);

  function searchform(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.checked) {
      case true:
        setIsChecked(true);
        break;
      case false:
        setIsChecked(false);
        break;
      default:
        break;
    }
  }
   
  useEffect(() => {
    (async function run() {
      const { items } = await getItems();
      setItems(items)
      console.log(items);
    })();
  }, []);

  function handleItems() {
    window.location.reload();
  }

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ItemSearch: { value: string };
    }
    try {
      const { items } = await getItemsbySearch(target.ItemSearch.value);
      setItems(items)
      console.log(items);
    } catch (error) {
        console.error("Error finding Item:", error);
    }
  }
  return (
    <HomeNav>
      <div className="home">
        <div className="container" id="pagewrap">
            <div className="searchinput">
              <form className="search" onSubmit={handleSearch}>
                  <input id="ItemSearch" name="ItemSearch" placeholder="Search for Items..." required></input>
                    {isChecked && (
                      <CloseButton className="clear-btn" onclick={handleItems}/>
                    )}
                  <button className="submit-btn" type="submit">Search</button>
              </form>
            </div>
            <div className="items container">
              <Row>
                {Array.isArray(items) && items.length > 0 && (
                <>
                    {items.map((item) => {
                        const imageUrl = item.imageFileId && getPreviewImageById(item.imageFileId)
                        const image = {
                          url: imageUrl,
                          height: item.imageHeight,
                          width: item.imageWidth,
                        };
                        return (
                            <Col xs={12} md={3} key={item.$id} style={{ paddingBottom: '20px' }}>
                                <a className="itemLink" href={`#/Item/${item.$id}`}>
                                    <ItemCard
                                        image={{
                                          height: image.height,
                                          url: image.url,
                                          width: image.width
                                        }}
                                        name={item.name}
                                        date={item.date}
                                        author={item.author}
                                    />
                                </a>
                            </Col>
                        );
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