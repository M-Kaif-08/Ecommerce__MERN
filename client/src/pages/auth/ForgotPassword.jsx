import { useState } from "react"
import { Link } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { motion } from "motion/react";

import Input from '../../components/common/Input';

import { FiMail, FiLoader } from "react-icons/fi";
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { loading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden min-h-screen flex justify-center items-center">
            <div className="md:max-w-md max-w-sm w-full overflow-hidden rounded-2xl bg-light-gradient">
                <div className="p-8">
                    <h1 className="text-center text-3xl font-bold font-play mb-6 bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">Forgot Password</h1>
                    {!isSubmitted ?
                        (
                            <form onSubmit={handleSubmit}>
                                <p className="text-center text-muted mb-6">
                                    Enter your email and we'll send you a link to reset your password
                                </p>
                                <Input
                                    icon={FiMail}
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <motion.button
                                    type='submit'
                                    className='w-full px-4 py-3 mt-5 font-bold font-play rounded-xl bg-brand-gradient focus:ring-1 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                >
                                    {loading ? <FiLoader className='mx-auto animate-spin' size={24} /> : "Send Reset Link"}
                                </motion.button>
                            </form>
                        ) :
                        (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <FiMail className="w-8 h-8 text-foreground" />
                                </motion.div>
                                <p className="text-muted mb-6">If an account exixts for {email}, you will receive a password reset link shortly.</p>
                            </div>
                        )}
                </div>
                <div className='px-8 py-4 flex justify-center bg-background/30'>
                    <Link to='/login' className='text-primary hover:underline text-sm flex items-center gap-2'>
                        <FaArrowLeftLong className="h-4 w-4" />Back to login
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default ForgotPassword