import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/LoginStyle.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {  Box } from "@mui/system";
import TextField from "@mui/material/TextField";

function Login() {
  const classes = styles()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
 
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/play");
  }, [user, loading, error]);
  return (
    <div className="login" style={classes.loginPage}>
      <Typography sx={classes.title} fontSize={"50px"} color="white"> 
        Welcome to <a href={() => false} style={classes.title.procrastin8}>PROCRASTIN8</a>!
      </Typography>
      <Box sx={classes.boxContainer}>
          <TextField
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            variant="outlined"
            color="info"
            sx = {classes.email}
          />
          <TextField
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            variant="outlined"
            sx = {classes.password}
          />
          <Button
            className="login__btn"
            onClick={() => signInWithEmailAndPassword(email, password)}
            sx={classes.loginButton}
            variant="contained"
          >
            Login With Email
          </Button>
          <Button className="login__btn login__google" onClick={signInWithGoogle} 
            sx={classes.loginGoogle}
            variant="contained"
            >
            Login with Google
          </Button>
          <Typography sx={classes.forgotPass}>
            <Link to="/reset" style={classes.forgotPass.resetLink}>FORGOT PASSWORD?</Link>
          </Typography>
          <Typography sx={classes.register}>
            Don't have an account? <Link to="/register" style={classes.register.registerLink}>REGISTER</Link> now.
          </Typography>
      </Box>
    </div>
  );
}
export default Login;