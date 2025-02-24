import '../src/main.css'
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert, CloseButton, AlertHeading, Button, Accordion } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Link } from 'wouter';

import { useAuth } from './lib/AuthHook';
import { TraderyItems } from './lib/ItemsInterface';
import { getPreviewImageById } from "./lib/storage";
import { getItems, getItemsbyCategory } from './lib/Items';
import { getItemsbySearch } from './lib/Items';
import ItemCard from './comp/ItemCard';
import HomeNav from './HomeNav';
import { createProfileData, findUserDataById } from './lib/UserProfile';
import { TraderyUser } from './lib/GetUser';
import { getUser } from './lib/appwrite';
import { TraderyProfileImage } from './comp/Profile';



const HomePage = () => {
  const [items, setItems] = useState<Array<TraderyItems> | undefined>();
  const [isHidden, setIsHidden] = useState(false);
  const [user, setUser] = useState<TraderyUser | undefined>();
  const [image, setImage] = useState<TraderyProfileImage>();
   
  useEffect(() => {
    (async function run() {
      const { items } = await getItems();
      setItems(items);
      const userData = await getUser();
      setUser(userData);
      
      if (userData) {
          const userExists = await findUserDataById(userData.$id); // Now returns true/false
          console.log("User Exists? ", userExists); // Debugging

          if (!userExists) {       
              await createProfileData(userData.$id, {
                  profileImageId: "",
                  profileSummary: null,
                  profileImageWidth: image?.width ?? 100,
                  profileImageHeight: image?.height ?? 100,
                  displayName: null,
                  defaultName: userData.name
              });
              console.log("New profile created.");
          }
      }
    })();
  }, []);

  async function handleHomeItems() {
    const { items } = await getItems();
    setItems(items);
  }

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsHidden(prevState => !prevState);
    const target = e.target as typeof e.target & {
      ItemSearch: { value: string };
    }
    try {
      const { items } = await getItemsbySearch(target.ItemSearch.value);
      setItems(items)
    } catch (error) {
        console.error("Error finding Item:", error);
    }
  }
  
  async function handleCategory(category: string) {
    const { items } = await getItemsbyCategory(category);
    setItems(items);
    console.log(items);
  }
  // Define a mapping object for category names
  const categoryMap: { [key: string]: string } = {
    a: "School Supplies",
    b: "Clothing",
    c: "Entertainment/Hobbies",
    d: "Gaming/Technology",
    e: "Accessories",
    f: "Miscellaneous"
  };
  return (
    <HomeNav>
      <div className="home">
        <div className="container" id="pagewrap">
            <div className="searchinput">
              <form className="search" onSubmit={handleSearch} autoComplete="off">
                  <input id="ItemSearch" name="ItemSearch" placeholder="Search for Items..." required></input>
                    {isHidden && (
                      <CloseButton className="clear-btn" onClick={handleHomeItems}/>
                    )}
                  <button className="submit-btn" type="submit">Search</button>
              </form>
            </div>
            <div className="categories">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Filter by Categories</Accordion.Header>
                  <Accordion.Body>
                  <Row>
                    <Col sm={8} md={10} lg={12}>
                      <Button variant="outline-danger" onClick={handleHomeItems}>Clear Filter</Button>
                      <Button variant="outline-primary" onClick={() => handleCategory("a")}>School Supplies</Button>
                      <Button variant="outline-secondary" onClick={() => handleCategory("b")}>Clothing</Button>
                      <Button variant="outline-success" onClick={() => handleCategory("c")}>Entertainment/Hobbies</Button>
                      <Button variant="outline-warning" onClick={() => handleCategory("d")}>Gaming/Technology</Button>
                      <Button variant="outline-info" onClick={() => handleCategory("e")}>Accessories</Button>
                      <Button variant="outline-dark" onClick={() => handleCategory("f")}>Miscellaneous</Button>
                    </Col>
                  </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
                            <Col sm={12} md={6} lg={3} key={item.$id} style={{ paddingBottom: '20px' }}>
                                <a className="itemLink" href={`#/Item/${item.$id}`}>
                                  <div className="itemLabel">
                                    <span className="Label">{categoryMap[item.itemCategory] || "Uncategorized"}</span>
                                  </div>
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
                    No Items are currently posted, &nbsp;
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