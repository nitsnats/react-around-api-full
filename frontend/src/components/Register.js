import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = ({ handleRegister, isLoading }) => {
 
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
        const userData = {
            email,
            password,
        };
        handleRegister(userData);
    }

    return (
        <div className='auth'>
            <form className='auth__form' onSubmit={handleSubmit}>
                <div className='auth__wrapper'>
                    <h3 className='auth__title'>Sign up</h3>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            className='auth__input'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            id='password'
                            className='auth__input'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                </div>
                <button type='submit' className='auth__button'>
                   {isLoading ? 'Signning up...' : 'Sign up'}
                </button>
                    <p className='auth__text'>
                        Already a memeber? {' '}
                        <Link className='auth__link' to='/signin'>
                            Log in here!
                        </Link>
                    </p>
            </form>
        </div>
    );
}

export default withRouter(Register);