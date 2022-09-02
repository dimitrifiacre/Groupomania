import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.scss";
import avatarImg from "../assets/default-avatar.png";
import Avatar from "../components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import iconSet from "../fonts/selection.json";
import IcomoonReact from "icomoon-react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Alert from "../components/Alert/Alert";
import { getUser, updateUser, deleteUser } from "../store/actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [job, setJob] = useState("");
  const [file, setFile] = useState(false);
  const [profileIsUpdated, setProfileIsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDataAvatar, setUserDataAvatar] = useState("");
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.user_avatar_url == null) {
        setUserDataAvatar(avatarImg);
      } else {
        setUserDataAvatar(`${process.env.REACT_APP_API_URL}img/${userData.user_avatar_url}`);
      }
    }
  }, [userData]);

  // Récupère l'image upload et la met dans le hook
  const changeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleChangeProfile = async (e) => {
    e.preventDefault();

    if (firstname && lastname && job) {
      const data = new FormData();
      data.append("firstname", firstname);
      data.append("lastname", lastname);
      data.append("job", job);
      if (file) data.append("image_url", file);
      await dispatch(updateUser(userData.user_id, data));
      dispatch(getUser(userData.user_id));

      setErrorMessage("");
      setProfileIsUpdated(false);
    } else {
      setErrorMessage("Les champs doivent contenir du texte");
    }
  };

  const deleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      await dispatch(deleteUser(userData.user_id));
      window.location = "/";
    }
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profile__banner"></div>
        {profileIsUpdated ? (
          <>
            <form className="profile__user form-group" onSubmit={handleChangeProfile}>
              <div className="profile__header">
                <div className="profile__change-avatar">
                  <input type="file" id="file" accept=".png,.jpg,.jpeg,.gif" onChange={changeImage} />
                  <label className="btn btn-icon btn-edit_image btn-edit_image--avatar" htmlFor="file">
                    <IcomoonReact iconSet={iconSet} size={14} icon="photography" color="#fff" />
                  </label>
                  <Avatar className="avatar profile__avatar" img={file ? URL.createObjectURL(file) : userDataAvatar} />
                </div>
                <div className="profile__buttons-group">
                  <Button className="btn btn-secondary" value="Annuler" onClick={() => setProfileIsUpdated(false)}></Button>
                  <Button type="submit" className="btn btn-primary" value="Enregistrer"></Button>
                </div>
              </div>
              {errorMessage && <Alert className="alert alert-error" value={errorMessage} />}
              <div className="form-group form-group--inputs">
                <div className="form-group__names">
                  <Input type="text" name="firstname" value={firstname} placeholder="Prénom" onChange={(e) => setFirstname(e.target.value)} />
                  <Input type="text" name="lastname" value={lastname} placeholder="Nom" onChange={(e) => setLastname(e.target.value)} />
                </div>
                <Input type="job" name="job" value={job} placeholder="Poste" onChange={(e) => setJob(e.target.value)} />
                <Link to="#" onClick={deleteAccount}>
                  Supprimer mon compte
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="profile__user">
            <div className="profile__header">
              <div className="profile__infos">
                <Avatar className="avatar profile__avatar" img={userDataAvatar} />
                <div>
                  <span className="profile__name">
                    {userData.user_firstname} {userData.user_lastname} {userData.user_admin ? <IcomoonReact iconSet={iconSet} size={16} icon="admin" color="#FD2D01" /> : null}
                  </span>
                  <span className="profile__job">{userData.user_job}</span>
                </div>
              </div>
              <Button
                className="btn btn-secondary"
                value="Modifier mon profil"
                onClick={() => {
                  setProfileIsUpdated(true);
                  setFirstname(userData.user_firstname);
                  setLastname(userData.user_lastname);
                  setJob(userData.user_job);
                }}
              ></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;