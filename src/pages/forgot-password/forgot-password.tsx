import React, { FC } from 'react';
import forgotPasswordStyles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../services/types/index';

export const ForgotPasswordPage: FC = () => {

    const dispatch = useAppDispatch();

    const isResettingPassword = useAppSelector(store => store.userReducer.isResettingPassword);

    const { values, handleChange } = useForm({
      email: ''
    })

    const handleForgotPasswordRequest = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(forgotPassword(values.email));
    }

    return (
      isResettingPassword ? (
        <Redirect to = '/reset-password' />
      ) : (
        <section className={forgotPasswordStyles.loginFormWrapper}>
          <div className={forgotPasswordStyles.loginForm}>
            <h2 className={`${forgotPasswordStyles.loginFormHeader} text text_type_main-medium`}>Восстановление пароля</h2>
            <div className="pt-6 pb-20">
              <form className={forgotPasswordStyles.loginFormBody}  onSubmit={handleForgotPasswordRequest}>
                <EmailInput
                  placeholder={'Укажите e-mail'}
                  name={'email'}
                  onChange={handleChange}
                  value={values.email}
                />
                <Button htmlType="submit" type="primary" size="large">
                  Восстановить
                </Button>
              </form>
            </div>
            <p className={`${forgotPasswordStyles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
              Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
          </div>
        </section>
      )
    )

}
