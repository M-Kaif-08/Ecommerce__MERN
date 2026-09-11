import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

import Input from '../../components/common/Input';

import { IoPersonOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { LuLock } from "react-icons/lu";

const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(name, email, password);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden min-h-screen flex justify-center items-center">

      <div className="md:max-w-md max-w-sm w-full overflow-hidden rounded-2xl bg-light-gradient">

        <div className="p-8">
          <h1 className="text-center text-3xl font-bold font-play mb-6 bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">Create your account</h1>
          <form onSubmit={handleSignUp}>
            <Input
              icon={IoPersonOutline}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <motion.button
              type='submit'
              className='w-full px-4 py-3 mt-5 font-bold font-play rounded-xl bg-brand-gradient focus:ring-1 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </form>
        </div>

        <div className='px-8 py-4 flex justify-center bg-background/30'>
          <p className='text-sm text-muted'>Already have an account? {" "}
            <Link to='/login' className='text-primary hover:underline'>Login</Link>
          </p>
        </div>
      </div>

    </motion.div>
  )
}

export default Signup