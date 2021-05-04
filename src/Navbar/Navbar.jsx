import React, { Component } from 'react';
import './Navbar.css';
import Logo from '../assests/images/logo1.png';

class Navbar extends Component {
	render() {
		return (
			<div className="nav-section">
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-sm-3 col-3">
							<nav className="navbar navbar-expand-lg navbar-light ">
								<div className="alignment">
								<img className="logo" src={Logo} />

								{/* <button
									className="navbar-toggler"
									type="button"
									data-toggle="collapse"
									data-target="#navbarSupportedContent"
									aria-controls="navbarSupportedContent"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<span className="navbar-toggler-icon" />
								</button> */}
								</div>

								<div className="collapse navbar-collapse nav-item" id="navbarSupportedContent">
									<ul className="navbar-nav mr-auto">
										<li className="nav-item active">
											<a className="nav-link" id="child-link" href="#">
												HOME 
											</a>
										</li>

										<li className="nav-item dropdown">
											<a
												className="nav-link dropdown"
												href="#"
												id="navbarDropdown"
												data-toggle="dropdown"
											>
												PRODUCTS
											</a>
											<div
												className="dropdown-menu dropdown-content"
												aria-labelledby="navbarDropdown"
											>
												<a className="dropdown-item" href="#">
													Car Insurance
												</a>
												<a className="dropdown-item" href="#">
													Bike Insurance
												</a>

												<a className="dropdown-item" href="#">
													Health Insurance
												</a>
												<a className="dropdown-item" href="#">
													Home Insurance
												</a>
												<a className="dropdown-item" href="#">
													Travel Insurance
												</a>
												<a className="dropdown-item" href="#">
													Personal Insurance
												</a>
											</div>
										</li>
										<li className="nav-item active">
											<a className="nav-link" href="#">
												ABOUT
											</a>
										</li>
										<li className="nav-item active">
											<a className="nav-link" href="#">
												CONTACT
											</a>
										</li>
									</ul>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;
