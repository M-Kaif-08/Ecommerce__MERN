const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="size-5 text-primary" />
            </div>
            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 rounded-xl placeholder-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
        </div>
    )
}

export default Input