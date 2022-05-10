
const parseHtml = (dom) =>{
    let dom_array, tag=false, dom_json=[], title,link,start,end;;
    dom_array = dom.split(/\r?\n/);
    for(let i=0;i<dom_array.length;i++){
        if(dom_array[i].includes(`<li class="latest-stories__item">`)){
            console.log("open li", dom_array[i])
            tag = true
        }
        if(tag){
            if(dom_array[i].includes(`<a`)){   
                console.log("a:",  dom_array[i])
                start =  dom_array[i].indexOf(`"`);
                end = dom_array[i].indexOf(`">`);
                let _link = dom_array[i].substring(start + 1, end)
                link = `https://time.com${_link}`;
            }
            if(dom_array[i].includes(`<h3`)){
                console.log("h3",  dom_array[i])
                start =  dom_array[i].indexOf(`">`);
                end = dom_array[i].indexOf(`</h3>`)
                title = dom_array[i].substring(start + 2, end)
                title = title.replace(/$|<em>|<\/em>/gi,"")
            }   
           /*  if(isSet(title) && isSet(link)){
                dom_json.push({title: title,link: link});
            } */
            if(dom_array[i].includes(`<\/li>`)){
                console.log("close li", dom_array[i])
                dom_json.push({title: title,link: link});
                tag = false;
            }
        } 
    }
    console.log("RES:",  dom_json)
    return dom_json;
}
 
const isSet = (value) =>{
    if(typeof value === "undefined" || value === undefined || value === "" || value === null){
        return false
    } 
    else 
        return true
}
module.exports = {
    htmlParser: parseHtml,
}
