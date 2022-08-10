import '../index.css'
import React, { useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
// import Card from "./Card";

export default function App() {

	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
	function handleEditAvatarPopupClick() {
		setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
	function handleEditProfilePopupClick() {
		setEditProfilePopupOpen(true);
	}
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
	function handleAddPlacePopupClick() {
		setAddPlacePopupOpen(true);
	}
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);
	function handleCardClick(card) {
		setSelectedCard(card);
		setIsImagePopupOpen(true);
	}
	function closeAllPopups() {
		setEditAvatarPopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setIsImagePopupOpen(false);
		setSelectedCard(null)
	}

    return(
		<div className='page'>
			<Header />
			<Main
				onEditProfile={handleEditProfilePopupClick}
				onEditAvatar={handleEditAvatarPopupClick}
				onAddPlace={handleAddPlacePopupClick}
				onCardClick={handleCardClick}
			/>
			<Footer />

			{/* <!-- Попап редактирования профиля --> */}

			{/*<section className="popup popup_profile">*/}
			{/*			<form className="popup__form" name="form-profile">*/}
			{/*				<h3 className="popup__title">Редактировать профиль</h3>*/}
			<PopupWithForm
				isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}
				title="Редактировать профиль"
				name="form-profile"
				onSubmit={"Сохранить"}
			>
				<input
					id="name-input"
					className="popup__input popup__input_name"
					placeholder="Имя"
					type="text"
					required
					maxLength="40"
					minLength="2"
				/>
				<span className="popup__input-error name-input-error"></span>
				<input
					id="about-input"
					className="popup__input popup__input_about"
					placeholder="Профессия"
					type="text"
					required
					maxLength="200"
					minLength="2"
				/>
				<span className="popup__input-error about-input-error"></span>
			</PopupWithForm>
		{/* <!-- Попап добавления новых карточек --> */}
		<PopupWithForm
			isOpen={isAddPlacePopupOpen}
			onClose={closeAllPopups}
			title={"Новое место"}
			name={"form-card"}
			onSubmit={"Создать"}
			>
			<input
				id="title-input"
				className="popup__input popup__input_title"
				placeholder="Название"
				type="text"
				name="name"
				required
				maxLength="30"
				minLength="2"
			/>
			<span className="popup__input-error title-input-error"></span>
			<input
				id="link-input"
				className="popup__input popup__input_link"
				placeholder="Ссылка на картинку"
				type="url"
				name="link"
				required
			/>
			<span className="popup__input-error link-input-error"></span>
		</PopupWithForm>
		{/* <!-- Попап редактирования аватара --> */}
		<PopupWithForm
			isOpen={isEditAvatarPopupOpen}
			onClose={closeAllPopups}
			title={"Редактировать аватар"}
			name={"form-avatar"}
			onSubmit={"Сохранить"}
		>
			<input
				className="popup__input popup__input_avatar"
				id="avatar-input"
				placeholder="Ссылка на картинку"
				type="url"
				name="avatar"
				required
			/>
			<span className="popup__input-error avatar-input-error"></span>
		</PopupWithForm>
		{/* <!-- Попап удаления карточки --> */}
		<section className="popup popup_delete">
			<form className="popup__form" name="form-delete">
				<h3 className="popup__title popup__title_delete">Вы уверены?</h3>
				<button className="popup__submit-button popup__submit-button_delete" type="submit">Да</button>
				<button type="button" className="popup__close-button popup__close"></button>
			</form>
		</section>
		{/* <!-- Попап открытия фото --> */}
		<ImagePopup
			name="popup_fullscreen"
			card={selectedCard}
			isOpen={isImagePopupOpen}
			onClose={closeAllPopups}>
		</ImagePopup>
		</div>
    )

};

