import React, { Component } from 'react';
import './style.css';
import Card1 from '../assests/images/insurance/bike.png';
import Card2 from '../assests/images/insurance/car.png';
import Card3 from '../assests/images/insurance/health.png';
import Card4 from '../assests/images/insurance/home.png';
import Card5 from '../assests/images/insurance/travel.png';
import Card6 from '../assests/images/insurance/personal.png';
import Award1 from '../assests/images/award-img01.png';
import Award2 from '../assests/images/award-img02.png';
import Partners1 from '../assests/images/partners/1.png';
import Partners2 from '../assests/images/partners/2.png';
import Partners3 from '../assests/images/partners/3.png';
import Partners4 from '../assests/images/partners/4.png';
import Partners5 from '../assests/images/partners/5.png';
import Partners6 from '../assests/images/partners/6.png';
import Partners7 from '../assests/images/partners/7.png';
import Partners8 from '../assests/images/partners/8.png';
import Partners9 from '../assests/images/partners/9.png';
import Partners10 from '../assests/images/partners/10.png';
import Menuicon from '../assests/images/menu-icon/sophie.png';
import Mobileview from '../assests/images/mobile-view.png';
import Aboutlogo from '../assests/images/wecompare-new/rt-abt-img.png';

class Banner extends Component {
	render() {
		return (
			<div className="banner-content">
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 Banner-section">
							<h4>
								Get Insurance Cover at Right <br/>Price…
							</h4>
							<p>Complete Transparency in Exclusions, Coverages, Add-Ons</p>
						</div>
					</div>
				</div>
				 <div className="container">
					<div className="row">
						<div className="col-xl-12 col-md-12 col-sm-3 col-12 card-section">
							<div className="row">
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card1} />
										<p className="card-description">Bike Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card2} />
										<p className="card-description">Car Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card3} />
										<p className="card-description">Health Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card4} />
										<p className="card-description">Home Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card5} />
										<p className="card-description">Travel Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card6} />
										<p className="card-description">Personal Insurance</p>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12">
							<img src={Award1} />
							<img src={Award2} />
						</div>
					</div>
				</div>
				
				 <div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12">
							<div className="row lmn">
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners1} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners2} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners3} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners4} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners5} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners6} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners7} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners8} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners9} />
								</div>
								<div className="col-md-1 partner-card">
									<img className="partner-img" src={Partners10} />
								</div>
							</div>
						</div>
					</div>
				</div> 
				<div className="container">
					<div className="row ">
						<div className="col-md-12 col-sm-6 col-12 menu-section">
							<img src={Menuicon} />
							<div className="menu-description">
								<p>Jaika Insurance</p>
								<h4>How can we help you?</h4>
							</div>
						</div>
						<div className="col-md-12 col-sm-6 col-12 text-center">
							<div>
								<button className="btn btn-light">I need to make a Renewal</button>
								<button className="btn btn-light">Know Policy Status</button>
								<button className="btn btn-light"> A Claim</button>
								<button className="btn btn-light">Change to my Policy</button>
							</div>
							<div>
								<button className="btn btn-light"> Submit claim documents </button>
								<button className="btn btn-light"> Know claim status </button>
								<button className="btn btn-light">Name transfer </button>
								<button className="btn btn-light"> Any other </button>
							</div>
						</div>
					</div>
				</div>
				<br />
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 temp-background">
							<div className="row">
								<div className="col-md-6 temp-section">
									<img src={Mobileview} />
								</div>
								<div className="col-md-6 ">
									<div className="row">
										<div className="col-md-6 temp-description">
											<h3>COMPARE THE QUOTE</h3>
											<p>
												Comparing premium with dozens of India's leading insurance companies, we
												will find you the best deals available.{' '}
											</p>
										</div>
										<div className="col-md-6 temp-description">
											<h3> Best Prices </h3>
											<p>
												With the wide variety of specialist insurers on our stand, we negotiate
												rates with various insurers and offer best deal to you.
											</p>
										</div>
										<div className="col-md-6 temp-description">
											<h3> Unrivalled Service </h3>
											<p>
												Experience an unrivalled web journey along the way, in partnership with
												expert phone support.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12">
							<div className="row">
								<div className="col-md-8 about-section">
									<h4>About Us</h4>
									<p>
										{' '}
										Providing Right Insurance Cover by Providing,Unbiased Quotes and Product
										Comparison.Established in 2004, Jaika Insurance Brokerage Pvt. Ltd. is a
										Maharashtra based; independent risk management, adviser and General Insurance
										Broking Company. Jaika Insurance Brokerage Pvt. Ltd. is a part of Jaika Group of
										Companies.{' '}
									</p>
								</div>
								<div className="col-md-4 about-section">
									<img src={Aboutlogo} />
								</div>
							</div>
						</div>
					</div>
				</div><br/>

                <div className="container fluid">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 ">
							<div className="row flex-inner">
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card1} />
										<p className="card-description">Bike Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card2} />
										<p className="card-description">Car Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card3} />
										<p className="card-description">Health Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card4} />
										<p className="card-description">Home Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card5} />
										<p className="card-description">Travel Insurance</p>
									</a>
								</div>
								<div className="col-md-2">
									<a href="#" className="card">
										<img className="card-img" src={Card6} />
										<p className="card-description">Personal Insurance</p>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
                
				<br />
				<br /> 
			</div>
		);
	}
}

export default Banner;
