import React, { useEffect, useState } from 'react';
import { Col, Row, Button, CloseButton, Alert, Accordion, Container } from 'react-bootstrap';

import { getPreviewImageById } from "./lib/storage";
import { getItems, getItemsbyCategory, getItemsbySearch } from './lib/Items';
import { createProfileData, findUserDataById, getUserDataById, TraderyProfiles, updateUserData } from './lib/UserProfile';
import { ItemCard } from './comp/ItemCard';
import HomeNav from './HomeNav';
import '../src/main.css';
import { useNavigate } from 'react-router-dom';
import Tutorial from './comp/Tutorial';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./lib/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { userInfo } from './lib/context/UserContext';

const HomePage = () => {
  const [items, setItems] = useState<Array<any>>([]);
  const [isHidden, setIsHidden] = useState(false);
  const [authors, setAuthors] = useState<{ [key: string]: TraderyProfiles }>({});
  const [userdb, setUserdb] = useState<TraderyProfiles | undefined>();
  const navigate = useNavigate();
  const {userData} = userInfo();
  
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate(`/Dashboard/Profile`);
  };

  useEffect(() => {
    (async function fetchItems() {
        try {
            const { items } = await getItems();
            setItems(items);

            const authorData: { [key: string]: TraderyProfiles } = {};
            await Promise.all(
                items.map(async (item) => {
                    if (!authorData[item.authorID]) {
                        const { userdb } = await getUserDataById(item.authorID);
                        authorData[item.authorID] = userdb;
                    }
                })
            );
            setAuthors(authorData);

            if (!userData) return;

            const userExists = await findUserDataById(userData.$id);
            console.log("User Exists? ", userExists);

            if (!userExists) {
              setShow(true);
              await createProfileData(userData.$id, {
                  userId: userData.$id,
                  profileImageId: "",
                  profileSummary: null,
                  profileImageWidth: 100,
                  profileImageHeight: 100,
                  displayName: userData.name,
                  defaultName: userData.name,
                  userEmail: userData.email,
                  firebaseId: "",
              });
              console.log("New profile created.");
            }
            
            if (userData.$id) {
              try {
                  const { userdb } = await getUserDataById(userData.$id);
                  setUserdb(userdb);
            
                  if (userdb.firebaseId) {
                      // 🔹 If user exists, log in with Firebase
                      console.log("User exists, logging in...");
                      await signInWithEmailAndPassword(auth, userdb.userEmail, userdb.userId);
                      console.log("login successful");
                  } else {
                      // 🔹 If user doesn't exist, create Firebase account
                      console.log("User does not exist, creating account...");
                      await createUserWithEmailAndPassword(auth, userdb.userEmail, userdb.userId);
            
                      // 🔹 Wait for Firebase auth state update
                      await new Promise((resolve) => onAuthStateChanged(auth, (user) => user && resolve(user)));
            
                      if (!auth.currentUser) {
                          console.error("User is not authenticated!");
                          return;
                      }
            
                      // 🔹 Store user data in Firestore using correct UID
                      await setDoc(doc(db, "users", auth.currentUser.uid), {
                          username: userdb.defaultName,
                          email: userdb.userEmail,
                          id: auth.currentUser.uid,
                          blocked: [],
                      });
            
                      await setDoc(doc(db, "userchats", auth.currentUser.uid), { chats: [] });
                      await updateUserData(userdb.userId, {
                          ...userdb,
                          firebaseId: auth.currentUser.uid
                      });
                  }
              } catch (error: any) {
                  console.error("Login error:", error);
              }
            };
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    })();
  }, []);

  async function handleCategory(category: string) {
    const { items } = await getItemsbyCategory(category);
    setItems(items);
  }

  async function handleClear() {
    window.location.reload();
    setIsHidden(false);
  }

  async function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsHidden(true);
    const target = e.target as typeof e.target & { ItemSearch: { value: string } };
    try {
      const { items } = await getItemsbySearch(target.ItemSearch.value);
      setItems(items);
    } catch (error) {
      console.error("Error finding Item:", error);
    }
  }

  // Category mapping with colors
  const categoryMap: { [key: string]: { name: string; color: string } } = {
    a: { name: "School Supplies", color: "primary" },
    b: { name: "Clothing", color: "success" },
    c: { name: "Entertainment/Hobbies", color: "warning" },
    d: { name: "Gaming/Technology", color: "danger" },
    e: { name: "Fashion Accessories", color: "info" },
    f: { name: "Sports & Outdoor", color: "dark" },
  };

  return (
    <HomeNav>
      <Tutorial show={show} onHide={handleClose} />
      <div className="home">
        <div className="container" id="pagewrap">
          {/* ✅ Search input */}
          <div className="searchinput">
            <form className="search" onSubmit={handleSearch} autoComplete="off">
              <input id="ItemSearch" name="ItemSearch" placeholder="Search for Items..." required />
              {isHidden && <CloseButton className="clear-btn" onClick={handleClear} />}
              <button className="submit-btn" type="submit">Search</button>
            </form>
          </div>

          {/* ✅ Category filtering */}
          <div className="categories">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Filter by Categories</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col>
                      <Button variant="outline-danger" onClick={handleClear}>Clear Filter</Button>
                      {Object.entries(categoryMap).map(([key, value]) => (
                        <Button key={key} variant={`outline-${value.color}`} onClick={() => handleCategory(key)}>
                          {value.name}
                        </Button>
                      ))}
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          {/* ✅ Item display */}
          <div className="items container">
            <Row>
              {items.length > 0 ? (
                items.map((item) => {
                  const imageUrl = item.imageFileId && getPreviewImageById(item.imageFileId);
                  const image = { url: imageUrl, height: item.imageHeight, width: item.imageWidth };
                  const author = authors[item.authorID];

                  return (
                    <Col sm={12} md={6} lg={3} key={item.$id} style={{ paddingBottom: '20px' }}>
                      <a className="itemLink" href={`#/Item/${item.$id}`}>
                        <div className="itemLabel">
                          <span className="Label">{categoryMap[item.itemCategory]?.name || "Uncategorized"}</span>
                        </div>
                        {author ? (
                          <ItemCard
                            image={image}
                            name={item.name}
                            date={item.date}
                            author={author.displayName || author.defaultName}
                          />
                        ) : (
                          // Placeholder card when the author is not yet known
                          <div className="card placeholder-glow">
                            <div className="card-body">
                              <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                              </h5>
                              <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                              </p>
                            </div>
                          </div>
                        )}
                      </a>
                    </Col>
                  );
                })
              ) : (
                <Container>
                  <Alert key="warning" variant="warning">
                    No Items are currently posted, <Alert.Link href="#/Dashboard/Post">You can start by posting here</Alert.Link>.
                  </Alert>
                </Container>
              )}
            </Row>
          </div>
        </div>
      </div>
    </HomeNav>
  );
};

export default HomePage;