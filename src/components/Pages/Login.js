// import React, { useState, useFormInput } from 'react'
// import { Form, Button } from 'react-bootstrap';
// import './pages.css'
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// // import { setUserSession } from './Utils/Common';
// export default function Login(props) {
//     const [loading, setLoading] = useState(false);
//     const username = useFormInput('');
//     const password = useFormInput('');
//     const [error, setError] = useState(null);
//     // handle button click of login form
//     //   const handleLogin = () => {
//     //     setError(null);
//     //     setLoading(true);
//     //     axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
//     //       setLoading(false);
//     //       setUserSession(response.data.token, response.data.user);
//     //       props.history.push('/dashboard');
//     //     }).catch(error => {
//     //       setLoading(false);
//     //       if (error.response.status === 401) setError(error.response.data.message);
//     //       else setError("Something went wrong. Please try again later.");
//     //     });
//     //   }
//     return (
//         <div className='form-main'>
//             <h2>Sign in </h2>
//             <div className='enter-email'>
//                 <input className='enter-email' type="text" {...username} autoComplete="new-password" placeholder='Enter email' />
//             </div>
//             <div style={{ marginTop: 10 }}>
//                 <input className='enter-password' type="password" {...password} autoComplete="new-password" placeholder='Password'/>
//             </div>
//             <div  className='login-submit-remember'>
//             <input type="button" value={loading ? 'Loading...' : 'Sign in'} /><br />
//             <div>
//             <input type="checkbox" id="remember-me" name="rememberMe" value="rememberMe" />
//             <label for="rememberMe"> Remember Me</label><br />
//             </div>
//             </div>
//             <div>
//                 <h5>Don't have am account? <Link style={{ color:'red', scrollMarginBottom:'0'}} to='/'>Sign Up</Link></h5>
//                 <Link  style={{ color:'red', paddingTop:'0', marginTop:'0'}} to='/'>Forgot your password?</Link>
//             </div>
//         </div>
//     );
// }