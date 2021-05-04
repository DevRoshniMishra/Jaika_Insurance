import React, { Component } from 'react';
import './style.css';
import Tempimg from '../assests/images/wecompare-new/qjf.png';
import Icon1 from '../assests/images/icons-set/3-min.png';
import Icon2 from '../assests/images/icons-set/auto-scroll.png';
import Icon3 from '../assests/images/icons-set/qfa.png';
import ClaimImage from '../assests/images/wecompare-new/hassle-free.png';
import Information from '../assests/images/wecompare-new/Information.svg';
import Quality from '../assests/images/wecompare-new/cqqe.png';
import Boximg1 from '../assests/images/5 MINUTES POLICY ISSUANCE.png';
import Boximg2 from '../assests/images/OVER 500K HAPPY CLIENTS.png';
import Boximg3 from '../assests/images/AWARDS & RECOGNITION.png';
import Client from '../assests/images/users-icons.png';
import Quote from '../assests/images/Quote.png';

class Templates extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 Temp-section">
							<div className="row">
								<div className="col-md-6 temp-img">
									<img src={Tempimg} />
								</div>
								<div className="col-md-6 temp-descp">
									<h4>Quote journey form</h4>
									<p>
										Servicing more than 5 L customers for their general insurance needs. Our new
										quote journey allows you to easily compare quotes in few minutes, using
										revolutionary and unique features like auto scroll, quote fill assistant and
										custom drop down boxes.
									</p>
									<img src={Icon1} />
									<img src={Icon2} />
									<img src={Icon3} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 claim-section">
							<div className="row">
								<div className="col-md-6 claim-desc">
									<h4>
										Simple <span className="highlight-text">claim</span> <br />process
									</h4>
									<p>
										<strong>Jaika Insurance:</strong> If you need to make a claim, you can contact
										our staff member on our live chat service or simply upload your applicable claim
										form and we will do the rest !{' '}
									</p>
									<button className="btn claim-btn btn-danger">LODGE CLAIM</button>
								</div>
								<div className="col-md-6 claim-img">
									<img src={ClaimImage} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12">
							<div className="row">
								<div className="col-md-6 information-desc">
									<img src={Information} />
								</div>
								<div className="col-md-6 information-desc">
									<h4>
										Information at your<br /> <span className="highlight-text">finger tip</span>
									</h4>
									<p>
										<strong>Jaika Insurance PORTAL:</strong> Sign in to our management portal 'Jaika
										Insurance' which will allow you to manage all your policies from multiple
										insurers, in one place. You can make statements, refer a relative, renew your
										policies, simultaneously compare several quotes and much more.
									</p>
									<button className="btn claim-btn btn-danger">LODGE CLAIM</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 claim-section">
							<div className="row">
								<div className="col-md-6 claim-desc">
									<h4>
										Compare quotes <br /> <span className="highlight-text">quickly</span> and{' '}
										<span className="highlight-text">easily</span>
									</h4>{' '}
									<br />
									<p>
										Once you effortlessly complete one of our forms, you can browse in detail for
										different Price, features, coverage, exclusions and options that each insurer
										offering! After deciding on the policy and insurer, you will be redirected to
										the respective insurer's portal to finalise the details and make your payment.
									</p>
									<button className="btn claim-btn btn-danger">LODGE CLAIM</button>
								</div>
								<div className="col-md-6 claim-img">
									<img src={Quality} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 text-center why-us">
							<h4>WHY Jaika Insurance?</h4>
							<div className="row">
								<div className="col-md-4">
									<div className="box-1">
										<img src={Boximg1} />
										<p>POLICY ISSUANCE IN FEW MINUTES</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="box-1">
										<img src={Boximg2} />
										<p>POLICY ISSUANCE IN FEW MINUTES</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="box-1">
										<img src={Boximg3} />
										<p>POLICY ISSUANCE IN FEW MINUTES</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-6 col-12 client-section">
							<div className="row client" >
								<div className="col-md-6 client-desc ">
									<h4>
										Our Clients <br />{' '}
										<span className="highlight-text">love Jaika Insurance !</span>
									</h4>
									<img src={Quote} />
									<br />
									<p>
										My first experience with Jaika Insurance was an absolute delight. Their positive
										response and effective actions changed my opinion of the entire insurance
										segment. Hope they keep it up!"
									</p>
									<h6>@Anni72a on the Appstore</h6>
								</div>
								<div className="col-md-6 claim-img">
									<img src={Client} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Templates;
