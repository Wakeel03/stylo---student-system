export function getCurrentDate(){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let newDate = new Date()
    let date = newDate.getDate()
    let month = months[newDate.getMonth()]
    let year = newDate.getFullYear() 

    return (date < 10 ? "0" : "") + date + " " + month + " " + year
}