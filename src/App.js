import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import Users from './components/Users/Users'
import HomePage from './components/HomePage/HomePage'
import Header from './components/Header/Header';
import Comments from './components/Comments/Comments'
import Ratings from './components/Ratings/Ratings';
import Categories from './components/Categories/Categories';
import Trailers from './components/Trailers/Trailers';
import Dashboard from './components/Dashboard/Dashboard';
import AddCategory from './components/Categories/AddCategory';
import AddTrailer from './components/Trailers/AddTrailer';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './components/Footer/PrivacyPolicy';
import TermOfUse from './components/Footer/PrivacyPolicy';
import TrailerDetails from './components/Trailers/TrailerDetails';
import CommentDetails from './components/Comments/CommentDetails';
import RatingDetails from './components/Ratings/RatingDetails';
// import CategoryDetails from './components/Categories/CategoryDetailes';



// import Pages from './components/Pages/Pages';
import Login from './components/Pages/Login';
// import ExtraPages from './components/Pages/ExtraPages';
import Register from './components/Pages/Register';
import Recover from './components/Pages/Recover';
import Confirm from './components/Pages/Confirm';
import Contact from './components/Pages/Contact';
import About from './components/Pages/About';
import Faq from './components/Pages/Faq';

function App() {

  const [users, setUsers] = useState([]);
  const [comments,setComments]=useState([]);
  const [trailers, setTrailers] = useState([]);
  
  

  return (
    <div className="app">
		<Router>
			<Header/>
			<Switch>
				<Route exact path="/" component={HomePage}/>
				<Route exact path="/dashboard" component={Dashboard}/>
				<Route exact path="/addcategory" component={AddCategory}/>
				<Route exact path="/addtrailer" component={AddTrailer}/>	
				<Route
				  exact path="/userlist"
				  render={() => <Users users={users} />}
				/>
				<Route
				  exact path="/commentlist"
				  render={() => <Comments comments={comments}/>}
				/>
				<Route
				  exact path="/commentdetails/:id"
				  render={() => <CommentDetails />}
				/>
				{/* <Route
				  exact path="/categorydetails/:id"
				  render={() => <CategoryDetails />}
				/> */}
				<Route
				  exact path="/ratings"
				  render={() => <Ratings/>}
				/>
				<Route
				  exact path="/ratingdetails/:id"
				  render={() => <RatingDetails />}
				/>
				<Route
				  exact path="/categories" 
				  render={() => <Categories/>}
				/>
				<Route
				  exact path="/trailers"
				  render={() => <Trailers trailers={trailers}/>}
				/>
				<Route
				  exact path="/trailerdetails/:id"
				  render={() => <TrailerDetails />}
				/>
				<Route
				  exact path="/privacypolicy"
				  render={() => <PrivacyPolicy />}
				/>
				<Route
				  exact path="/termofuse"
				  render={() => <TermOfUse />}
				/>
				<Route
				  exact path="/login"
				  render={() => <Login />}
				/>
				<Route
				  exact path="/register"
				  render={() => <Register />}
				/>
				<Route
				  exact path="/recover"
				  render={() => <Recover />}
				/>
				<Route
				  exact path="/confirm"
				  render={() => <Confirm />}
				/>
				<Route
				  exact path="/contact"
				  render={() => <Contact />}
				/>
				<Route
				  exact path="/about"
				  render={() => <About />}
				/>
				<Route
				  exact path="/faq"
				  render={() => <Faq />}
				/>
				


				
		
			</Switch>
			<Footer/>
		</Router>
    </div>
  );
}

export default App; 


