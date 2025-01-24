import { Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import { Client, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('678ba12f001dce105c6a')
  .setkey('standard_e7b9373ac042442c58dda70d04a6060c86fa8aeeac043a4f906d3012dcd940cfc800bbd35fdaed8980d02410a30b2df4127a5c8f046b014948f86c2cb20993996c34e91245e7ff366e23fc947f08cac315526c4626288a9d95c55fcfa264cc91ca8edea1f8dc69c0537ca29e0e06e50f8148266edf2ebef8ba14db67147ab08f')
export { OAuthProvider }

const account = new Account(client);

const CheckSession = async () => {
  try {
    const sessionid = await account.getSession()
    console.log(sessionid)
  } catch (error) {
    console.error(error)
    useNavigate("/")
  }
}

CheckSession()