import { RouterComponents } from "./routers";
import "bulma/css/bulma.min.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Analytics } from '@vercel/analytics/react';
import { getAnalytics } from "firebase/analytics";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import "./App.css";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFy-uVEA6kDsFJoyFc5W4vzpmSAY6tx6o",
  authDomain: "exe201-398306.firebaseapp.com",
  databaseURL:
    "https://exe201-398306-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "exe201-398306",
  storageBucket: "exe201-398306.appspot.com",
  messagingSenderId: "821403486513",
  appId: "1:821403486513:web:8cba3de537662f0b3ec810",
  measurementId: "G-8CD4YKFPEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ position: "relative" }} className="App">
        <RouterComponents />
      </div>
      <Analytics />
    </QueryClientProvider>

  );
}

export default App;
