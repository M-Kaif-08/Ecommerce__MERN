import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const EmailVerification = () => {

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        const newCode = [...code]
        console.log(newCode);

        // Handle Pasted Content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            console.log(pastedCode);
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            //  Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            //  Move focus to the next input field f value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        alert(`Verification code submitted: ${verificationCode}`);
    }

    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code])


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden min-h-screen flex justify-center items-center">

            <div className="md:max-w-md max-w-sm w-full overflow-hidden rounded-2xl bg-light-gradient">
                <div className="p-8">
                    <h1 className="text-center text-3xl font-bold font-play mb-6 bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">Verify Your Email</h1>
                    <p className="text-center text-muted mb-6">Enter the 6-digit code sent to your email address.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength='6'
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-2xl font-bold bg-light-background border-2 border-border rounded-xl outline-none focus:border-primary"
                                />
                            ))}
                        </div>
                        <motion.button
                            type='submit'
                            className='w-full px-4 py-3 mt-5 font-bold font-play rounded-xl bg-brand-gradient focus:ring-1 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Verify Email
                        </motion.button>
                    </form>
                </div>
            </div>

        </motion.div>
    )
}

export default EmailVerification