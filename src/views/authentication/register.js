import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Register extends React.Component {
    state = {
        username: '',
        password: ''
    }

    submit = () => {
        axios.post('http://192.168.0.136:8444/api/user/',
            { username: this.state.username, password: this.state.password })
            .then((response) => {
                const { data } = response;
                localStorage.setItem('token', JSON.stringify(data.token));
                this.props.history.push("/app")
            })
            .catch((error) => {
                alert('Ocorreu um error')
            });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue', flexDirection: 'column', height: '100vh' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'skyblue', flexDirection: 'column', height: '40vh', width: '100%' }}>
                    <TextField
                        id="standard-name"
                        label="Usuário"
                        value={this.state.username}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        style={{ width: '35%' }}
                        onChange={this.handleChange('username')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Senha"
                        type="password"
                        value={this.state.password}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        style={{ width: '35%' }}
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <Button variant="outlined" color="primary" style={{ width: '35%' }} onClick={() => this.submit()} disabled={this.state.password || this.state.username ? false : true}>
                        Cadastrar
                    </Button>
                </div>
            </div>
        )
    }
}

export default Register;