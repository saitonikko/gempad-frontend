import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (status, comment) => {
    if (status === 0) toast.success(comment);
    if (status === 1) toast.warning(comment);
    if (status === 2) toast.error(comment);
}