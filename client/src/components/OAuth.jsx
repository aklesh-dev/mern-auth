import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../features/user/userSlice';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const photoURL = result.user.photoURL || '';
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.error("Could not login with google:", error);
        }
    };

    return (
        <button
            type='button'
            onClick={handleGoogleAuth}
            className='bg-red-600 text-white p-3 rounded-xl uppercase hover:opacity-90'
        >
            continue with google
        </button>
    )
}

export default OAuth;