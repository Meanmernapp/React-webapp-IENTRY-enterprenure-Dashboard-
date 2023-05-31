import { blueColor, greenColor, orangeColor, redColor, yellowColor } from "../constant/variable"

const checkStatus = (id) => {
    if (id === 2) {
        return yellowColor
    } else if (id === 3) {
        return blueColor
    } else if (id === 4) {
        return greenColor
    } else if (id === 5) {
        return orangeColor
    } else if (id === 6) {
        return redColor
    }
}

export default checkStatus