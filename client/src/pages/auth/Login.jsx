import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAuthStore } from '../../store/authStore';

import Input from '../../components/common/Input';
import toast from 'react-hot-toast';

import { FiMail, FiLoader } from "react-icons/fi";
import { LuLock } from "react-icons/lu";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const { loading, error, login } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
            toast.success("Login successfully")
        } catch (error) {
            console.log(error);
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
                    <h1 className="text-center text-3xl font-bold font-play mb-6 bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">Welcome Back</h1>
                    <form onSubmit={handleLogin}>
                        <Input
                            icon={FiMail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={LuLock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='flex items-center mb-6'>
                            <Link to='/forgot-password' className='text-sm text-primary hover:underline'>
                                Forgot Password?
                            </Link>
                        </div>

                        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                        <motion.button
                            type='submit'
                            className='w-full px-4 py-3 mt-5 font-bold font-play rounded-xl bg-brand-gradient focus:ring-1 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                        >
                            {loading ? <FiLoader className='mx-auto animate-spin' size={24} /> : "Login"}
                        </motion.button>
                    </form>
                </div>

                <div className='px-8 py-4 flex justify-center bg-background/30'>
                    <p className='text-sm text-muted'>Don't have an account? {" "}
                        <Link to='/signup' className='text-primary hover:underline'>SignUp</Link>
                    </p>
                </div>
            </div>

        </motion.div>
    )
}

export default Login