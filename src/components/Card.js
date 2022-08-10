export default function Card(props) {
	function handleClick() {
		props.onCardClick(props.card);
	}

	return (
		<div className="elements__card">
			<img className="elements__image" src={props.link} alt={props.name} onClick={handleClick} />
			<button className="elements__trash-button" type="button" />
				<h2 className="elements__title">{props.name}</h2>
				<div className="elements__like-container">
					<button className="elements__like-button" type="button" id="like" />
					<span className="elements__like-counter">{props.likes}</span>
				</div>
		</div>
	);
}