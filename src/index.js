import {hello} from'./greet'
import {aws_config} from './aws_export'
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool ({
    UserPoolId: aws_config.userPoolId,
    ClientId: aws_config.clientId,
});

const register = (registerRequest) => {
    //ToDo introduce Promie instead of callbacks
    const attributeList = [
        new CognitoUserAttribute ({
            Name: 'website',
            Value: registerRequest.website,
        })
    ];

    userPool.signUp(registerRequest.email, registerRequest.password, [], null, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(result);
        })
    } 
const confirmAccount = (confirmRequest) => {
    const user = new CognitoUser({
        Username: confirmRequest.email,
        Pool: userPool
    });
    user.confirmRegistration(confirmRequest.code, true, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(result);
    })
}

const login = (loginRequest) => {
    const authDetails = new AuthenticationDetails({
        Username: loginRequest.email,
        Password: loginRequest.password,
    });

    const user = new CognitoUser({
        Username: loginRequest.email,
        Pool: userPool
    });

    user.authenticateUser(authDetails, {
        onSuccess: (result) => {
            console.log(result);
        },
        onFailure: (err) => {
            console.log(err);
        }
    })
}
const foo = "boo";
const registerBtn = document.querySelector('button.register');
const registerRequestPayload = {
    email: "ycr80953@zwoho.com",
    password: "1234qwer",
    website: 'jkan.pl',
}

registerBtn.addEventListener('click', () => {
    register(registerRequestPayload);
});


const confirmAccountBtn = document.querySelector('button.confirmAccount');
const confirmAccountRequest = {
    code:'843065',
    email: registerRequestPayload.email,
};
confirmAccountBtn.addEventListener('click', () => {
    confirmAccount(confirmAccountRequest)
});

const loginBtn = document.querySelector('button.login');
const loginRequestPayload = {
    email: registerRequest.email,
    password: registerRequest.password,
};

loginBtn.addEventListener('click', () => {
    loginBtn(loginRequestPayload);
});

(() => {
    hello("Ania :D");
})();