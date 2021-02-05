import React, { Component } from "react";
import "./FormValidate.css";

class FormValidate extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passConfirm: "",
    messenge: "",

    errors: {
      username: false,
      email: false,
      password: false,
      passConfirm: false,
    },
  };

  messenges = {
    username_wrong:
      "Nazwa musi mieć co najmniej 4 znaki i nie może zawierać spacji",
    email_wrong: "E-mail musi być poprawny, zawierać @ i nie zawierać spacji",
    password_wrong:
      "Hasło musi zawierać co najmniej 6 znaków, w tym jedną cyfrę i znak specjalny (!#@$%), nie może zawierać spacji",
    passConfirm_wrong: "Potwierdzenie musi być tożsame z hasłem",
  };

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;

    if (type === "text" || type === "password" || type === "email") {
      this.setState({
        [name]: e.target.value,
      });
    } else if (type === "checkbox") {
      this.setState({
        [name]: e.target.checked,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.formValidation();

    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        password: "",
        passConfirm: "",
        messenge: "Zostałeś pomyślnie zarejestrowany",

        errors: {
          username: false,
          password: false,
          email: false,
          passConfirm: false,
        },
      });
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          passConfirm: !validation.passConfirm,
        },
      });
    }
  };

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let passConfirm = false;
    let correct = false;

    if (
      this.state.username.length >= 4 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }

    if (
      this.state.email.indexOf("@") !== -1 &&
      this.state.email.indexOf(" ") === -1
    ) {
      email = true;
    }

    if (
      this.state.password.length >= 6 &&
      this.state.password.match("[!@#$%]")
    ) {
      password = true;
    }

    if (
      this.state.passConfirm === this.state.password &&
      this.state.passConfirm.length >= 6
    ) {
      passConfirm = true;
    }

    if (username && password && email && passConfirm) {
      correct = true;
    }

    return {
      correct,
      username,
      password,
      email,
      passConfirm,
    };
  };

  componentDidUpdate() {
    if (this.state.messenge !== "") {
      setTimeout(() => this.setState({ messenge: "" }), 3000);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="username">
            <p>Podaj imię:</p>
            <input
              name="username"
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          {this.state.errors.username && (
            <span>{this.messenges.username_wrong}</span>
          )}

          <label htmlFor="email">
            <p>Podaj email:</p>
            <input
              name="email"
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          {this.state.errors.email && <span>{this.messenges.email_wrong}</span>}

          <label htmlFor="password">
            <p>Podaj hasło:</p>
            <input
              name="password"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          {this.state.errors.password && (
            <span>{this.messenges.password_wrong}</span>
          )}

          <label htmlFor="passConfirm">
            <p>Potwierdź hasło</p>
            <input
              name="passConfirm"
              type="password"
              id="passConfirm"
              value={this.state.passConfirm}
              onChange={this.handleChange}
            />
          </label>
          {this.state.errors.passConfirm && (
            <span>{this.messenges.passConfirm_wrong}</span>
          )}

          <button>Zatwierdź</button>
          <h2>{this.state.messenge}</h2>
        </form>
      </div>
    );
  }
}

export default FormValidate;
