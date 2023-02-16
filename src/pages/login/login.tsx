import React, { FC } from 'react';
import loginStyles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { login } from '../../services/action-creators/userActionCreators';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch } from '../../services/types/index';

export const LoginPage: FC = () => {

  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  }

  return (
    <section className={loginStyles.loginFormWrapper}>
      <div className={loginStyles.loginForm}>
          <h2 className={`${loginStyles.loginFormHeader} text text_type_main-medium`}>Вход</h2>
          <div className="pt-6 pb-20">
            <form className={loginStyles.loginFormBody} onSubmit={handleLogin}>
              <EmailInput
                name={'email'}
                value={values.email}
                onChange={handleChange}
                data-testid="email_input"
              />
              <PasswordInput
                name={'password'}
                value={values.password}
                onChange={handleChange}
                data-testid="password_input"
              />
              <Button htmlType="submit" type="primary" size="large">
                Войти
              </Button>
            </form>
          </div>
          <p className={`${loginStyles.loginFormParagraph} text text_type_main-default text_color_inactive mb-4`}>
            Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
          </p>
          <p className={`${loginStyles.loginFormParagraph} text text_type_main-default text_color_inactive`}>
            Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
          </p>
      </div>
    </section>
  )

}
