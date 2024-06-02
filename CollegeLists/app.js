console.log("Worked!");

let URL = "http://universities.hipolabs.com/search?name=";
let searchButton = document.querySelector("#searchButton");
let loader = document.querySelector("#loader");

searchButton.addEventListener("click", async () => {
    document.querySelector("#searchInput").disabled = true;
    searchButton.disabled = true;
    loader.style.display = "block";
    let inp = document.querySelector("#searchInput").value;
    let resArr = await getColleges(inp);
    if (resArr.length === 0) {
        let h3 = document.createElement("h3");
        h3.innerText = `"${inp}" No such colleges found! Try a different one.`;
        let noFound = document.querySelector(".noFound");
        noFound.appendChild(h3);
        noFound.style.display = "block";
        setTimeout(() => {
            noFound.style.display = "none";
            h3.innerText = "";
        }, 3000);
    }
    loader.style.display = "none";
    document.querySelector("#searchInput").disabled = false;
    searchButton.disabled = false;
    let ul = document.querySelector("#collegeList");
    ul.innerHTML = "";
    for (res of resArr) {
        let li = document.createElement("li");
        li.innerText = res.name;
        ul.appendChild(li);
        console.log(res.name);
    }
    document.querySelector("#searchInput").value = "";

});

async function getColleges(inp) {
    try {
        let response = await axios.get(URL + inp);
        return response.data;
    } catch (err) {
        // Instead of logging the error directly, we throw it again to catch it in the click event listener
        throw err;
    }
}
