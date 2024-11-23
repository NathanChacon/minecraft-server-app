const isValidSubscription = (subscription: any) => {
    if (subscription) {
        const { status, end } = subscription;
        console.log("test", subscription)
        const isStatusValid = status !== "canceled";

        if(isStatusValid) {
            return true
        }



        const currentDate = Math.floor(Date.now() / 1000);
        const isValidDate = currentDate < end;

        return isValidDate;
    }

    return false;
};

export default isValidSubscription;