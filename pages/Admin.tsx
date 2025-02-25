import '../src/main.css'
import { Models } from 'appwrite';
import React, {useState, useEffect} from 'react'
import { Col, Row, Nav, Navbar, NavDropdown, Container, Alert, AlertHeading } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { getCurrentSession} from "./lib/appwrite";
import { Redirect } from 'wouter';
import Form from 'react-bootstrap/Form';
import { TraderyItems } from './lib/ItemsInterface';
import { getPreviewImageById } from "./lib/storage";
import { getItemsbyApproval } from './lib/Items';
import ItemCard from './comp/ItemCard';
import { fetchUserData } from './lib/User';
import HomeNav from "./HomeNav";
import { getUserDataById, TraderyProfiles } from './lib/UserProfile';

export default function Register() {
  const {isAdmin, logInAdmin} = useAuth();
  const [author, setAuthor] = useState<TraderyProfiles>();

  const handleAdminLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    }
    await logInAdmin(target.email.value, target.password.value)
    window.location.reload();
  }

  const [items, setItems] = useState<Array<TraderyItems> | undefined>();

  useEffect(() => {
        (async function run() {
        const user = await fetchUserData();
        if (!user) {
            console.log("User data is still loading. Please wait.");
            return;
        }
        const { items } = await getItemsbyApproval();
        setItems(items)
        console.log(items);
        })();
  }, []);
  return (
      <>
      {!isAdmin && (
        <div className="RegAdminContainer">
          <div className="login-register-container">
            <form onSubmit={handleAdminLogin} autoComplete="off">
              <div className="form-field-wrapper">
                <label>Email:</label>
                <input required type="email" name="email" placeholder="Enter email..."/>
              </div>

              <div className="form-field-wrapper">
                <label>Password:</label>
                <Form.Control type="password" name="password" placeholder="Enter password..."/>
              </div>

              <div className="form-field-wrapper">
                <Button type="submit" className="admin-btn btn-dark w-100">Log-In</Button>
              </div>

            </form>
          </div>
        </div>
        )}
        {isAdmin && (
        <HomeNav>
          <div className="home">
            <div className="container" id="pagewrap">
              <h1>UNAPPROVED ITEMS</h1>
              <div className="items container">
                <Row>
                  {Array.isArray(items) && items.length > 0 && (
                      <>
                          {items.map((item) => {
                              const imageUrl = item.imageFileId && getPreviewImageById(item.imageFileId)
                              const image = {
                              url: imageUrl,
                              height: item?.imageHeight,
                              width: item?.imageWidth,
                              };
                              
                              useEffect(() => {
                                (async function run() {
                                  const {userdb} = await getUserDataById(item.authorID);
                                  setAuthor(userdb);
                                })();
                              }, [item.authorID]);
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
                                              author={author ? author.displayName || author.defaultName : "Unknown Author"}
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
                          No Items are waiting to be approved yet.
                          </Alert>
                      </Container>
                  )}
                </Row>
              </div>
            </div>
          </div>
        </HomeNav>
      )}
      </>
  )
}
