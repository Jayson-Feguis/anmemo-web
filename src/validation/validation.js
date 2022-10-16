import * as Yup from 'yup';

function validateEmail() {
    return Yup.object({
        email: Yup.string().email().required('Required').label('Email').matches(
            /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            "Invalid Format"
        )
    });
};

function validatePassword() {
    return Yup.object({
        password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.{\}[\]|\\:;"',\\\/\^()#+?&])[A-Za-z\d@$!%*.{\}[\]|\\:;"',\/\^()#+?&]{8,26}$/,
            "Invalid Inputs"
        ).required("Required"),
        confirm_password: Yup.string().required("Required").oneOf([Yup.ref('password'), null], "Password don't match.")
    });
}

export{ validateEmail, validatePassword }