var lis = document.getElementById("container").children;

var result = [];

for(let i of lis){
	if(i.getAttribute('data-tag').match(/css/))
		result.push({
			name:i.children[1].innerText,
			url: i.children[1].children[0].href
		});
}

console.log(result);