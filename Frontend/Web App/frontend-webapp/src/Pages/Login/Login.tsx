import React from 'react';
import "./Login.css";
import { useParams } from 'react-router-dom';

export default function Login() {
  let params = useParams();

  return (
    <div>
      <h1>This is the login page for user: {params.id}</h1>
    </div>
  );
}