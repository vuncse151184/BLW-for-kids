import { RouterComponents } from "./routers";
import "bulma/css/bulma.min.css";
import React, { useEffect } from 'react';
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

import ReactGA from 'react-ga';
const TRACKING_ID = "G-3LGWLMQ467";
ReactGA.initialize(TRACKING_ID);


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
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ position: "relative" }} className="App">
        <RouterComponents />
        <Analytics />
      </div>

    </QueryClientProvider>

  );
}

export default App;
