function validate() {
	var phoneNumber = document.getElementById('phone-number');
	var inputValidation = document.getElementById('form-fields__input-required');
	var fаranchiseInput = document.getElementById('fаranchise');
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;

    if(x >= 1140 && phoneNumber.value.length !== 11) {
        fаranchiseInput.style.marginTop = "17px";
        inputValidation.style.display = "unset";
        return false;
    }

    if(phoneNumber.value.length !== 11) {
        inputValidation.style.cssText = "display: unset;text-align: center;display: block;margin: 0;margin-bottom: 17px;";
        return false;
    }
    return true;
}
