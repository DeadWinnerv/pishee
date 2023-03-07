import React from "react";
import styles from './SwitchButton.module.scss'

const Button = (props) => {
	const handleClick = props.handleClick
	const [isToggled, setToggled] = React.useState(false)
	const toggleSwitchButton = () => {
		setToggled(!isToggled)
		handleClick()
	}
	
	return (
		<button className={
			!isToggled
			? styles.SwitchButton
			: styles.SwitchButton + ' ' + styles.toggledSwitchButton
		} onClick={toggleSwitchButton} id={props.id}>
			{props.text}
		</button>
	)
}

export default Button