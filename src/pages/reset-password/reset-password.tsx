import React, { FC } from 'react';
import resetPasswordStyles from './reset-password.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../services/types/index';

export const ResetPasswordPage: FC = () => {

  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    newPassword: '',
    resetPasswordCode: ''
  })

  const isResettingPassword = useAppSelector(store => store.userReducer.isResettingPassword);

  const handleResetPasswordRequest = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(values.newPassword, values.resetPasswordCode));
  }

  if (!isResettingPassword) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }} />
    )
  }

  return (
    <section className={resetPasswordStyles.loginFormWrapper}>
      <div className={resetPasswordStyles.loginForm}>
        <h2 className={`${resetPasswordStyles.loginFormHeader} text text_type_main-medium`}>Восстановление пароля</h2>
        <div className="pt-6 pb-20">
          <form className={resetPasswordStyles.loginFormBody} onSubmit={handleResetPasswordRequest}>
            <PasswordInput
              placeholder={'Введите новый пароль'}
              name={'newPassword'}
              onChange={handleChange}
              value={values.newPassword}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              name={'resetPasswordCode'}
              onChange={handleChange}
              value={values.resetPasswordCode}
            />
            <Button htmlType="submit" type="primary" size="large">
              Сохранить
            </Button>
          </form>
        </div>
        <p className={`${resetPasswordStyles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
            Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </section>
  )

}
