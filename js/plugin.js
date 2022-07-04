let btn = document.getElementById('btn');
let theInput = document.getElementById('theInput');
let theOutput = document.getElementById('result');
let resArabic = document.getElementById('resArabic');
let currency = document.getElementById('currency');
let only = document.getElementById('only');
let nothingElse = document.getElementById('else');
let copy1 = document.getElementById('copyArabic');
let copy2 = document.getElementById('copyEnglish');
let toggleBtn = document.querySelector('.toggle');
let container = document.querySelector('.container');


btn.addEventListener("click", function(){
    theOutput.innerText = '';
    resArabic.innerText = '';
    let onlyVal = '';
    if(only.value){
        onlyVal = ' only';
    }
    if(theInput.value){
        var theWord = numberToWords.toWords(theInput.value);
        let api = `https://api.mymemory.translated.net/get?q=${theWord}&langpair=en|ar`;
        try {
            fetch(api).then(res => res.json()).then(data => {
                let resultBreplace =  (data.responseData.translatedText) + ' ' + only.value +' ' + nothingElse.value;
                let finalResult =  resultBreplace.replace('،', 'و'); 
                let finalResult2 =  finalResult.replace('ريالًا', 'ريال'); 
                let finalResult3 =  finalResult2.replace('بنسًا', 'قرش'); 
                let finalResult4 =  finalResult3.replace('هالة', 'هللة');
                let finalResult5 =  finalResult4.replace('مصريًا', '');
                let finalResult6 =  finalResult5.replace('جنيهًا', 'جنيه');
                resArabic.innerText = finalResult6;
                theOutput.innerText = theWord + onlyVal;
                copy1.classList.remove('hidden');
                copy2.classList.remove('hidden');
            });
        } catch (error) {
            console.log('error')
        }
    }else{
        theOutput.innerText = 'Please type a number to convert';
    }
});
function copyText(theEle){
    if(!theEle){
        return;
    }
    let copied = theEle.innerText;
    let inputElement = document.createElement('input');
    inputElement.setAttribute('value', copied);
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    inputElement.parentNode.removeChild(inputElement);
}
copy1.addEventListener("click", function(){
    copyText(resArabic)
});
copy2.addEventListener("click", function(){
    copyText(theOutput)
});
toggleBtn.addEventListener("click", function(){
    toggleBtn.classList.toggle('fire');
    container.classList.toggle('active')
})


