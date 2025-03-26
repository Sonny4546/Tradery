import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Notification from "./components/notification/Notification";
import { useUserStore } from "../pages/lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { Container, Row, Col, Modal, CloseButton, Button } from "react-bootstrap";
import styles from './index.module.css';
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/lib/firebase";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore() as {
    currentUser: any;
    isLoading: boolean;
    fetchUserInfo: (uid: string | undefined) => void;
  };
  const { chatId, changeChat } = useChatStore();
  const [showDetail, setShowDetail] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  console.log(currentUser, isLoading, fetchUserInfo);

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchUserInfo(user.uid);
        console.log(user.uid, user.email);
        setIsAdmin(user.email === "bagus.anselliam@ue.edu.ph");
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unSub();
  }, [fetchUserInfo]);

  return (
    <Container fluid className={styles.appContainer}>
            <Row className={styles.appContent}>
            {currentUser && (
                <>
                  {/* Chat List - Hidden on Mobile if Chat is Open */}
                  {showChatList && (
                    <Col xs={12} md={4} className={styles.listContainer}>
                      <List />
                    </Col>
                  )}

                  {/* Chat Section - Full Width on Mobile when Open */}
                  {chatId && (
                    <Col xs={12} md={8} className={styles.chatContainer}>
                      <Chat
                        openDetail={() => setShowDetail(true)}
                        goBackToChatList={() => setShowChatList(true)}
                      />
                    </Col>
                  )}

                  {/* Detail Modal for Both Mobile and Desktop */}
                  <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
                    <Modal.Header>
                      <CloseButton onClick={() => setShowDetail(false)} />
                    </Modal.Header>
                    <Modal.Body>
                      <Detail />
                    </Modal.Body>
                  </Modal>
                </>
            )}
              <Notification />
            </Row>
    </Container>
  );
}

export default App;