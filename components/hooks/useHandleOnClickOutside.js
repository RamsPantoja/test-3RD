import { useEffect, useState } from "react";


const useHandleOnClickOutside = (ref) => {
    const [open, setOpen] = useState(false);
    const [isOnFocus, setIsOnFocus] = useState('');

    const openMenu = () => {
        if (open) {
            setOpen(false)
            setIsOnFocus('rgba(0, 0, 0, 0)');
        } else {
            setOpen(true);
            setIsOnFocus('rgba(0, 0, 0, 0.1)');
        }
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false)
            setIsOnFocus('rgba(0, 0, 0, 0)');
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref]);

    return [open, isOnFocus, openMenu];
}

export default useHandleOnClickOutside;