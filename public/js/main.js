const deleteBtn = document.querySelectorAll('.fa')


Array.from(deleteBtn).forEach((element)=>{

    const quote = element.previousElementSibling;

    const text =  quote.innerText
    element.addEventListener('click', () => deleteQuote(text));
})



async function deleteQuote(text){
    console.log(text, 'hey');

    try{
        const response = await fetch('/quotes', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              quote: text
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

