import React, { useEffect, useState, FC } from 'react';
import profileStyles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout, updateUser } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../services/types/index';
import { NavLink, useRouteMatch } from 'react-router-dom';

type FormStateType = {
  name: string | null;
  email: string | null;
};

export const ProfilePage: FC = () => {

  const initialFormState: FormStateType = {
    name: '',
    email: '',
  }

  const { url } = useRouteMatch();

  const dispatch = useAppDispatch();

  const { userName, userLogin, isLoading, error } = useAppSelector(store => store.userReducer);

  const { values, handleChange, setValues } = useForm<FormStateType>(initialFormState);

  useEffect(() => {
    setValues({
      name: userName,
      email: userLogin
    })
  }, [userName, userLogin, setValues]);

  const handleLogoutClick = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  }

  const [dataChanged, setDataChanged] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataChanged(true);
    handleChange(e);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(updateUser(values.name, values.email));
  }

  const handleCancelChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setValues({
      ...values,
      name: userName,
      email: userLogin,
    });
    setDataChanged(false);
  }

  if (isLoading) {
    return <h1>Загрузка</h1>;
  }

  if (!isLoading && error && error.length > 0) {
    return <h1>Ошибка</h1>;
  }

  return (

    <main className={profileStyles.profileMain}>
      <section className={profileStyles.profileMenu}>
        <p className="text text_type_main-medium pt-4 pb-4">Профиль</p>
        <p className="text text_type_main-medium pt-4 pb-4 text_color_inactive">
          <NavLink to={`${url}/orders`} exact={true}>История заказов</NavLink>
        </p>
        <a href="/">
          <p
            className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
            onClick={handleLogoutClick}
          >Выход</p>
        </a>
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
      </section>
      <section>
        <form className={profileStyles.profileFields} onSubmit={handleSaveProfile}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            icon={'EditIcon'}
            //@ts-ignore
            value={values.name}
            name={'name'}
            onChange={onChange}
          />
          <Input
            placeholder={'Логин'}
            icon={'EditIcon'}
            //@ts-ignore
            value={values.email}
            name={'email'}
            onChange={onChange}
          />
          <Input
            placeholder={'Пароль'}
            type={'password'}
            icon={'EditIcon'}
            name={'password'}
            onChange={onChange}
            value={''}
          />
          {dataChanged &&
            <div className={profileStyles.profileButtons}>
              <a href="/" className={profileStyles.cancelButton} onClick={handleCancelChanges}>Отмена</a>
              <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </div>
          }
        </form>
      </section>
    </main>

  )

}
