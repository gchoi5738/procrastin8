import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import styles from "../styles/RegisterStyle.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {  Box } from "@mui/system";
import TextField from "@mui/material/TextField";

function Register() {
  const classes = styles()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/play");
  }, [user, loading, navigate]);
  return (
    <div className="register" style={classes.registerPage}>
      <Typography fontSize={"50px"} color={"red"} sx={classes.title}>PROCRASTIN8</Typography>
      <Box sx={classes.boxContainer}>
        <TextField
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          variant="outlined"
          color="info"
          sx={classes.name}
        />
        <TextField
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          variant="outlined"
          color="info"
          sx={classes.email}
        />
        <TextField
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          variant="outlined"
          color="info"
          sx={classes.password}
        />
        <Button className="register__btn" onClick={register}
          sx={classes.registerEmail} variant="contained"
        >
          Register
        </Button>
        <Button
          className="register__btn register__google"
          onClick={signInWithGoogle}
          sx={classes.registerGoogle} variant="contained"
        >
          Register with Google
        </Button>
        <Typography sx={classes.alreadyAcc}>
          Already have an account? <Link to="/" style={classes.alreadyAcc.loginLink}>LOGIN</Link> now.
        </Typography>
      </Box>
    </div>
  );
}
export default Register;