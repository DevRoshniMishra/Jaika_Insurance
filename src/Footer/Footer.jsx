import React, { Component } from 'react';
import './Footer.css';
import Facebook from '../assests/images/socialmedia/facebook.png';
import Instagram from '../assests/images/socialmedia/instagram.png';
import Linkedin from '../assests/images/socialmedia/lindin.png';
import Twitter from '../assests/images/socialmedia/twitter.png';
import Icon from '../assests/images/Licences-icon.png';
import Andriodicon from '../assests/images/android-logo.png';
import Appleicon from '../assests/images/apple.png';
import Logo from '../assests/images/logo2.png';
import footerlogo1 from '../assests/images/Comodo-Secure.png';
import footerlogo2 from '../assests/images/mac.png';
import footerlogo3 from '../assests/images/Norton.png';
import footerlogo4 from '../assests/images/irdia.png';
import Payment_options from '../assests/images/payment-option.png';

class Footer extends Component {
	render() {
		return (
			<div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 footer-section">
							<div className="row ">
								<div className="col-md-6">
									{/* <img src={Instagram} />
									<img src={Facebook} />
									<img src={Linkedin} />
									<img src={Twitter} /> */}
								</div>
								<div className="col-md-6 icon-description">
									<img src={Icon} />
									<h4>
										<span>Direct Broker (General)</span>
										<br />
										<strong>IRDAI Registration Certificate No : 269</strong>
										<br />
										Validity : 04| 07 | 2022.<br />
										CIN: U67200 MH 2003 PTC 141081
									</h4>
								</div>
							</div>
							<div className="row footer-link">
								<div className="col-md-3 quick-link">
									<ul>
										<li>Helpful Links</li>
									</ul>
									<ul>
										<li>
											<a href="#"> About Us</a>
										</li>
										<li>
											<a href="#"> Contact</a>
										</li>
										<li>
											<a href="#"> Careers</a>
										</li>
										<li>
											<a href="#">Our Partners</a>
										</li>
										<li>
											<a href="#">Claims</a>
										</li>
									</ul>
								</div>
								<div className="col-md-3 quick-link">
									<ul>
										<li>Products</li>
									</ul>
									<ul>
										<li>
											<a href="#">Car Insurance</a>
										</li>
										<li>
											<a href="#">Bike Insurance</a>
										</li>
										<li>
											<a href="#">Home Insurance</a>
										</li>
										<li>
											<a href="#">Health Insurance</a>
										</li>
										<li>
											<a href="#">Travel Insurance</a>
										</li>
										<li>
											<a href="#">Personal Insurance</a>
										</li>
									</ul>
								</div>
								<div className="col-md-2 address-details">
									<p>Get in Touch</p>
									<p>2nd Floor, Jaika Building, Civil Lines, Nagpur, 440 001.</p>
								</div>
								<div className="col-md-4 text-center logo-section">
									<a href="#">
										<img src={Andriodicon} />
									</a>
									<a href="#">
										<img src={Appleicon} />
									</a>
									<p>
										Our app will be avilable for download on<br />
										the App Store & Play Store very soon.
									</p>
									<img src={Logo} />
									<div>
										<img className="img-fluid" src={footerlogo1} />
										<img className="img-fluid" src={footerlogo2} />
										<img className="img-fluid" src={footerlogo3} />
									</div>
								</div>
								<div className="row pay-section">
									<div className="col-md-1 license-section">
										<p>LICENSED BY</p>
										<img src={footerlogo4} />
									</div>
									<div className="col-md-8 license-description">
										<h6>
											IRDAI Direct Broker Registration Certificate No.269 | Valid till: 04|07|2022
											| CIN: U67200 MH 2003 PTC 141081
										</h6>
										<p>
											Insurance is the subject matter of Solicitation. All product information
											displayed on this website is authentic and solely provided by the respective
											insurance company with whom Jaika Insurance has an agreement.
										</p>
										<p>
											**Discount is offered by the Insurance company as approved by IRDAI for the
											product under File & Use guidelines #On the basis of your profile
										</p>
										<p>
											Kindly note that Jaikainsurance.com can share the particulars of
											clients/visitors with the insurers for the purpose of soliciting insurance
											policies.
										</p>
									</div>
									<div className="col-md-3">
										<p>Payment Options</p>
										<img src={Payment_options} />
									</div>
								</div>
								<div className="row" style={{display:'flex'}}>
									<div className="col-md-3 copy-right_section">
										<p>© Copyright. All rights reserved.</p>
									</div>
									<div className="col-md-9">
										<ul className="links">
											<li>
												<a href="#">Privacy Policy</a>
											</li>
											<li>
												<a href="#">Cancellation & Refund</a>
											</li>
											<li>
												<a href="#">Terms & Conditions</a>
											</li>
											<li>
												<a href="#"> Complaints</a>
											</li>
											<li>
												<a href="#">Shipping & Delivery Policy</a>
											</li>
											<li>
												<a href="#">Disclaimer</a>
											</li>
											<li>
												<a href="#">Complaint Handling Process</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
