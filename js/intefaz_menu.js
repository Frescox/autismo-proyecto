const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];
const colorPicker = document.getElementById('colorPicker');


colorPicker.addEventListener('input',function(){
    header.style.backgroundColor = colorPicker.value;
    footer.style.backgroundColor = colorPicker.value;
});

// addEventListener('change',inpu)