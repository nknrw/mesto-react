import '../index.css'
import React, {useEffect, useState} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

export default function App() {
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	useEffect(() => {
		api.getInitialCards()
			.then((initialCards) => {
				setCards(initialCards);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function handleCardLike(card) {
		const isLiked = card.likes.some((like) => like._id === currentUser._id);
		api.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
		})
			.catch((err) => {
				console.log(err);
			});
	}
	function handleCardDelete(card) {
		api.deleteCard(card._id).then(() => {
			setCards((state) => state.filter((c) => (c._id !== card._id)));
		})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		api.getUserInfo()
			.then(res => {
				setCurrentUser(res);
			}).catch(err => {
				console.log(err);
			}
		)
	}, []);

	function handleEditAvatarPopupClick() {
		setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleEditProfilePopupClick() {
		setEditProfilePopupOpen(true);
	}

	function handleAddPlacePopupClick() {
		setAddPlacePopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
		setIsImagePopupOpen(true);
	}

	function handleUpdateUser(data) {
		api.setUserInfo(data)
			.then(res => {
				setCurrentUser(res);
				closeAllPopups();
			}).catch(err => {
				console.log(err);
			}
		)
	}

	function handleUpdateAvatar(data) {
		api.setUserAvatar(data)
			.then(res => {
				setCurrentUser(res);
				closeAllPopups();
			}).catch(err => {
				console.log(err);
			}
		);
	}

	function handleAddPlace(data) {
		api.addCard(data)
			.then(res => {
				setCards([res, ...cards]);
				closeAllPopups();
			}).catch(err => {
				console.log(err);
			}
		);
	}

	function closeAllPopups(e) {
		setEditAvatarPopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setIsImagePopupOpen(false);
		setSelectedCard(null);
	}

    return(
		<CurrentUserContext.Provider value={currentUser}>
			<div className='page'>
				<Header />
				<Main
					onEditProfile={handleEditProfilePopupClick}
					onEditAvatar={handleEditAvatarPopupClick}
					onAddPlace={handleAddPlacePopupClick}
					onCardClick={handleCardClick}
					cards={cards}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
				/>
				<Footer />

				{/* <!-- ?????????? ???????????????????????????? ?????????????? --> */}
				<EditProfilePopup 
					isOpen={isEditProfilePopupOpen} 
					onClose={closeAllPopups} 
					onUpdateUser={handleUpdateUser}
				/>
				{/* <!-- ?????????? ???????????????????? ?????????? ???????????????? --> */}
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlace}
				/>
				{/* <!-- ?????????? ???????????????????????????? ?????????????? --> */}
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
				{/* <!-- ?????????? ?? ?????????????????? --> */}
				<ImagePopup
					name="popup_fullscreen"
					card={selectedCard}
					isOpen={isImagePopupOpen}
					onClose={closeAllPopups}>
				</ImagePopup>
			</div>
		</CurrentUserContext.Provider>
    )

};

