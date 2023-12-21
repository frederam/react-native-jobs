export const checkImage = (url) => {
    if (!url) return false
    else {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();
        request.onload = function () {
            const status = request.status;
            if (request.status == 200) //if(statusText == OK)
            {
                return true
            } else {
                return false
            }
        }
    }

}
export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        const check = pattern.test(url);
        //if (check == true) 
        return true
    }
};