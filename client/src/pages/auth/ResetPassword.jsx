import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAuthStore } from '../../store/authStore';

import Input from '../../components/common/Input';
import toast from 'react-hot-toast';

import { FiLoader } from "react-icons/fi";
import { LuLock } from "react-icons/lu";

const ResetPassword = () => {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { loading, error, resetPassword } = useAuthStore();
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token, password);
            toast.success("Password Reset Successfully! Redirecting to login page...")
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden min-h-screen flex justify-center items-center">

            <div className="md:max-w-md max-w-sm w-full overflow-hidden rounded-2xl bg-light-gradient">

                <div className="p-8">
                    <h1 className="text-center text-3xl font-bold font-play mb-6 bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={LuLock}
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Input
                            icon={LuLock}
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                        <motion.button
                            type='submit'
                            className='w-full px-4 py-3 mt-5 font-bold font-play rounded-xl bg-brand-gradient focus:ring-1 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                        >
                            {loading ? <FiLoader className='mx-auto animate-spin' size={24} /> : "Set New Password"}
                        </motion.button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default ResetPassword