import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

const SignInWithGoogle = () => {

    function googleLogin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result);
            const user = result.user;
            if (result.user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    fname: "",
                    lname: "",
                    uname: user.displayName,
                });
                toast.success("User logged in Successfully", {
                    position: "top-center",
                });
                window.location.href = "/Home";
            }
        });
    }

    return (
        <div>
            <p className="text-gray-700 mb-3">--Or continue with--</p>
            <div
            className="cursor-pointer"
            onClick={googleLogin}
            >
                <img src="/assets/google.png" width={"50%"} />
            </div>
        </div>
    );
}

export default SignInWithGoogle;