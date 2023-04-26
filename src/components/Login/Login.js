import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) =>{
  if(action.type === 'User_Input'){
    return{value:action.val, isValid:action.val.includes('@')};
  }
  if(action.type === 'Input_Blur'){
    return{value: state.value, isValid:state.value.includes('@')};
  }
  return{value:'',isValid:false}
};

const passwordReducer = (state, action) =>{
  if(action.type === 'User_pass'){
    return{value:action.val, isValid:action.val.trim().length>6};
  }
  if(action.type === 'Pass_Blur'){
    return{value: state.value, isValid:state.value.trim().length>6};
  }
  return{value:'',isValid:false}
};
 


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredcollege, setEnteredCollege] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value:'',
    isValid:false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{
    value:'',
    isValid:false,
  })

 useEffect(() =>{
  console.log('Effect Running');
 });
 
 
 
 
  // useEffect(() =>{
  //   const identifier = setTimeout(()=>{
  //     console.log('checking form validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollege.trim().length > 1
  //     ); 
  //   },500);

  //   return () => {
  //     console.log('Clean Up');
  //     clearTimeout(identifier);
  //   };
   
  // },[enteredEmail, enteredPassword,enteredcollege])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'User_Input', val: event.target.value});
    
    setFormIsValid(
            event.target.value.includes('@') && passwordState.value.trim().length > 6 && enteredcollege.trim().length > 1
          ); 
  
  };
   const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'User_pass', val: event.target.value});
    
    setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6 && enteredcollege.trim().length > 1
          ); 
  
  };
  const CollegeChangeHandler = (event) =>{
    setEnteredCollege(event.target.value);

    setFormIsValid(
            emailState.isValid && passwordState.value.trim().length > 6 && event.target.value.trim().length > 1
          ); 
  }

  const validateEmailHandler = () => {
    dispatchEmail({type: 'Input_Blur'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'Pass_Blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
           <label htmlFor="email">College Name</label>
          <input
            type="college"
            id="college"
            value={enteredcollege}
            onChange={CollegeChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
