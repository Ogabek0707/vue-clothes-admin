import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
const Notification = (text, type, time, description) => {
    return setTimeout(() => {
        createToast({title: text.text ,description: description.description}, {
            type: type.type,
            transition: 'slide',
            position: "top-right",
            showIcon: true,
            timeout: time.time
        })
    }, );
}
export default Notification