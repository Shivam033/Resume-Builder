import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './redux/reducers/rootReducer';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import thunk from 'redux-thunk'
import {reduxFirestore, getFirestore} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMZbZ2O4mcLQuf8eO2r45e7J19nbcK0BI",
  authDomain: "resume-builder-47511.firebaseapp.com",
  projectId: "resume-builder-47511",
  storageBucket: "resume-builder-47511.appspot.com",
  messagingSenderId: "290975536534",
  appId: "1:290975536534:web:4e28efb35046d381b339b7"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore()

const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),reduxFirestore(firebase)));

ReactDOM.render(

    <BrowserRouter>
    <Provider store={reduxStore}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <App />
    </ReactReduxFirebaseProvider>
    </Provider>
  
    </BrowserRouter>
,
  document.getElementById('root')
);