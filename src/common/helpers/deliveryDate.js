exports.deliveryDate = () => {
    var myDate = new Date();
    myDate.setDate(myDate.getDate() + 5);
    var day = myDate.getDay(); //getDay() returns 0-6, 0 for sunday..
    if (day == 6) {
        myDate.setDate(myDate.getDate() + 2);
    } else if (day == 0) {
        myDate.setDate(myDate.getDate() + 1);
    }
    return myDate
}

exports.setEndDateByYear = (a) => {
    var myDate = new Date();
    myDate.setFullYear(myDate.getFullYear() + Number(a))
    return myDate
}

exports.setEndDateByMonth = (a) => {
    var myDate = new Date();
    myDate.setFullYear(myDate.getMonth() + Number(a))
    return myDate
}