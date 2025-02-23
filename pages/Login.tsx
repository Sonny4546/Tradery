import '../src/main.css'
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useAuth } from './lib/AuthHook';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { createProfileData, findUserDataById } from './lib/UserProfile';
import { TraderyUser } from './lib/GetUser';
import { getUser } from './lib/appwrite';
import { TraderyProfileImage } from './comp/Profile';

export default function LoginPage() {
  const [user, setUser] = useState<TraderyUser | undefined>();
  const [image, setImage] = useState<TraderyProfileImage>();
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please check the notice below to continue..
    </Tooltip>
  );
  const { session } = useAuth();
  const navigate = useNavigate();
  if (session) {
    navigate(`/Home`);
  }
  const [isChecked, setIsChecked] = useState(false);

  function checkbx(event: React.ChangeEvent<HTMLInputElement>) {
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
  const { logIn } = useAuth();
  async function loginHandle() {
      await logIn();
      const userData = await getUser();
      setUser(userData);
      if (user) {
        const userdb = await findUserDataById(user.$id);
        if (!userdb) {       
          await createProfileData(user.$id, {
            profileImageId: "",
            profileSummary: null,
            profileImageWidth: image?.width ?? 100,
            profileImageHeight: image?.height ?? 100,
            displayName: null,
            defaultName: user.name
          });
          console.log("✅ New profile created.");
        }
        return;
      }
  }
  return (
    <>
    <div className="logincontainer">
      <div className="circle">
        <img src="./images/favicon.png"></img>
      </div>
      <p className="LoginWord"> USER LOGIN </p>
      <div className="google-button">
        {isChecked && (
          <Button className="login" variant="primary" size="lg" id="btn" style={{margin: 0}} onClick={loginHandle}>Login with Google</Button>
        )}
        {!isChecked && (
          <OverlayTrigger
          placement="right"
          delay={{ show: 0, hide: 400 }}
          overlay={renderTooltip}
          >
            <div>
              <Button className="login" variant="primary" size="lg" id="btn" style={{margin: 0}} disabled>Login with Google</Button>
            </div>
          </OverlayTrigger>
        )}
      </div>
      <div>
        <p className="Use">By using this website, you confirm that you are a member of the University of the East and agree to use only a valid UE email address (@ue.edu.ph) for registration and access.</p>
        <p className="Proc"> By proceeding, you acknowledge and accept this condition.</p>
        <input type="checkbox" id="cb-login" className="CheckBox" onChange={checkbx}></input>
      </div>
    </div>
    </>
  )
}