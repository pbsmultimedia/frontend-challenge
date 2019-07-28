import React from "react";
import "./header.scss";

let Header = (props) => 
{	
	return (
		<header className="header">
			<div className="header__row">
				<h1 className="header__title">
				{props.title}
				</h1>
				<nav
					className="header__nav"
				>
					<ul>
						{props.links.map((i,k)=>{
							return (
								<li 
									key={`header-navbar-item-${k}`}
									className="header__item"
								>
									{i}
								</li>
								)
						})}	
					</ul>	
				</nav>	
			</div>	
		</header>
		)
}

export default Header;