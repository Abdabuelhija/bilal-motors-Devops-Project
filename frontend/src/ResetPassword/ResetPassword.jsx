import React, { useState } from 'react';
import { resetPassword, sendMail } from "../AdminService";
import './ResetPasswordStyle.css';
import Logo from '../GeneralStyles/Logo.png';
import { Link } from 'react-router-dom';
export default function ResetPassword() {
    document.title = "Bilal Motors - Reset Password";
    const [randomNumber, setRandomNumber] = useState(null);
    const [userRandomInput, setuserRandomInput] = useState('');
    const [newPassword, setNewPassword] = useState("");
    const [Message, setMessage] = useState("");

    const [mailSent, setMailSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);


    function generateRandomLetters() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    }


    const handleSendMail = async () => {
        const random = Math.floor(Math.random() * (3000 - 50 + 1) + 50);
        const randomLetters = generateRandomLetters();
        const randomString = random.toString() + randomLetters;
        setRandomNumber(randomString);
        const response = await sendMail(randomString);
        if (response) {
            setMailSent(true);
        }
        else {
            setMessage("שגיאה ,תתקשר לעבד");
        }
    };


    const validateNumber = (event) => {
        event.preventDefault();
        if (userRandomInput == randomNumber) {
            setIsVerified(true);
            setMailSent(false);
        } else {
            setIsVerified(false);
            alert("מספר לא נכון , תבדוק את המייל ונסה שוב");
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        const response = await resetPassword(newPassword);
        if (response) {
            setResetSuccess(true);
            setIsVerified(false);
        }
        else {
            setMessage("שגיאה ,תתקשר לעבד");
        }

    }

    return (
        <>
                <div className="reset-password-container">
                <img src={Logo} alt='Logo' className='Logo' />
                <br />
                {Message && <small>{Message}</small>}
                <br />
                <p>
                    כדי לאפשר לך לאפס את הסיסמה, אנחנו שולחים לך מייל עם קוד חד פעמי
                </p>
                <button className='ResetButton' onClick={handleSendMail}>שליחת מייל</button>
                <br />
                {mailSent && (
                    <div className="mail-sent-container">
                        <p>
                            נשלח לך קוד חד פעמי לדואר האלקטרוני שלך, תכתוב אותו כאן
                        </p>
                        <form onSubmit={validateNumber}>
                            <br />
                            <input
                                className='resetInput'
                                type="text"
                                onChange={(e) => setuserRandomInput(e.target.value)}
                                placeholder='תכתוב את הקוד כאן'
                            />
                            <br />
                            <button className='ResetButton' type="submit">בדיקה</button>
                        </form>
                    </div>
                )}
                {isVerified && (
                     <div className="mail-sent-container">
                    <form onSubmit={handleResetPassword}>
                        <p>סיסמה חדשה</p>
                        <input
                            className='resetInput'
                            type="text"
                            onChange={(event) => setNewPassword(event.target.value)}
                            placeholder='תכתוב את סיסמה כאן'
                            required
                        />
                        <br />
                        <button className='ResetButton' type="submit">שינוי</button>
                    </form>
                    </div>
                )}
                {resetSuccess && (
                    <div className="reset-success-container">
                        <p>!סיסמתך עודכנה בהצלחה</p>
                        <Link className='Reset-a' to="/">לחץ כאן לחזרה לעמוד הראשי</Link>
                    </div>
                )}
            </div>
        </>
    );
}
