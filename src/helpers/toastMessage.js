import { toast } from 'react-toastify';

const commanSeting = () => {
    return {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };
};
const ToastHandle = (type, message) => {
    console.log(type, message, 'post')
    if (type === 'success') {
        toast.success(message, commanSeting());
    } else {
        toast.error(message, commanSeting());
    }
};
export default ToastHandle;
