function popup() {
    alert("Hello World")
}


function writeText(form) {
    
    
    if (form.tboxstart.value == "")
    {
        form.tboxstart.value = (form.inputbox.value);
    }

    if ((form.inputbox.value) == form.tboxstart.value)
    {
        
    }
    else
    {
        form.out.value = form.inputbox.value;
    }
        

}





