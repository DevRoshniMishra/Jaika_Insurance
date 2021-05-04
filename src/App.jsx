import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Banner from './HeroContent/Banner';
import Templates from './HeroContent/Templates';
import Footer from './Footer/Footer';

class App extends Component {
	render() {
		return (
			<div>
				 <Navbar/>
				 <Banner/> 
				 <Templates/> 
				 <Footer/>   
			
				
			</div>
		);
	}
}

export default App;

