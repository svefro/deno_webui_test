/* 
use es6-string-* extensions in vscode for highlighting of es6 strings
deno run --allow-all --unstable-kv main.ts

run with 
*/
import { WebUI } from "https://deno.land/x/webui/mod.ts";

const myWindow = new WebUI();


myWindow.bind('backend_set_kv',  (e: WebUI.Event) => {
    const key = e.arg.string(0)
    const val = e.arg.string(1)

    console.log("backend_set_kv")
    console.log(key + ": " + val)
    //await kv.set(["prefs", key], val)
    kv.set(["prefs", key], val)

    return "true"
})




myWindow.bind('backend_get_kv_and_update_what',  (e: WebUI.Event) :string=> {
    const key = e.arg.string(0)
    const target = e.arg.string(1)
    const bool = e.arg.boolean(2)
    
    //const opt = await kv.get(["prefs", key])
    //return opt.value

    kv.get(["prefs", key]).then(result=>{
        console.log("backend_get_kv " + key  + ": " + result.value)

        if (bool == true){
            myWindow.run(`${target} = ${result.value}`)
        }else{
            myWindow.run(`${target} = "${result.value}"`)
        }
        
        
       

        return result.value // dont work
    })
    
    return "sync resp, needs work"
    

});

// test: backend_get_kv("preset_1_txt")
  
  
// myWindow.bind("backend_get_kv",  async (e: WebUI.Event) :string => {
//     const key = e.arg.string(0)
//     const opt = await kv.get(["prefs", key])

//     console.log("opt.value is: " + opt.value)

    
//     return (`${opt.value}`)
// });

// async function backend_get_kv(e: WebUI.Event) {

//     const key = e.arg.string(0);
//     console.log("key is: " + key);
  
//     const opt = kv.get(["prefs", key]);
//     console.log("opt.value is: " + opt.value);
  
//     return (`${opt.value}`);
// }
  
// myWindow.bind("backend_get_kv", backend_get_kv);

async function backend_get_kv(e: WebUI.Event) {

    const key = e.arg.string(0);
    console.log("key is: " + key);
  
    const opt = await kv.get(["prefs", key]);
    console.log("opt.value is: " + opt.value);
  

    return String(opt.value)
    //return (`${opt.value}`);
}
  
myWindow.bind("backend_get_kv", backend_get_kv);
  
// async function backend_get_kv(e: WebUI.Event) {

//     const key = e.arg.string(0);
//     console.log("key is: " + key);
  
//     return (`TEST`);

    
//   }
  
//  myWindow.bind("backend_get_kv", backend_get_kv);

// async function backend_get_kv(e: WebUI.Event): Promise<string> {

//     const key = e.arg.string(0)
//     const opt = await kv.get(["prefs", key])
//     console.log(opt.value)

    
//     return (`${opt.value}`)

//     //return "Nothing"
//   }
  
  
// myWindow.bind("backend_get_kv", backend_get_kv);

myWindow.bind('backend_get_kv_old',  (e: WebUI.Event) => {
    const key = e.arg.string(0)
    
    //const opt = await kv.get(["prefs", key])
    //return opt.value

    kv.get(["prefs", key]).then(result=>{
        console.log("backend_get_kv " + key  + ": " + result.value)

        // temp workaround, i do not like
        // if (key.includes("_txt")){
        //     myWindow.run(`document.getElementById("txt_opt").value  = "${result.value}"`)
        // }else if (key.includes("_opt1")){
        //     myWindow.run(`document.getElementById("chk_opt1").checked = ${result.value}`)
        // }else if (key.includes("_opt2")){
        //     myWindow.run(`document.getElementById("chk_opt2").checked = ${result.value}`)
        // }
       

        return result.value // dont work
    })
    
    return "sync resp, needs work"
    

});

myWindow.bind('backendFunction', (e: WebUI.Event) => {
    console.log("backendFunction called")

    let obj = undefined
    try {
        obj = JSON.parse(e.arg.string(0))

    } catch (_error) {
        console.log("backendFunction failed to parse json")
    }

    if (!isNaN(Number(e.arg.string(0)))){
        console.log("Number only") // JSON.parse is happy getting a number only
        obj = undefined

    }

    if (obj){
        console.log("Got JSON, calling frontendFunction with stringifyed json")
        console.log(obj)
        myWindow.run(`frontendFunction('${JSON.stringify(obj)}');`);

    }else{
        // check for arguments
        const myArg1 = e.arg.string(0) // Test
        const myArg2 = e.arg.string(1) // Test2

        
        console.log(myArg1)
        console.log(myArg2)

        myWindow.run(`console.log("Logging in frontend from backend calling frontend function")`);

        if (myArg1 && myArg1.length > 0){
            //const retstr = "%c" + myArg1
            //console.log(retstr)
            myWindow.run(`frontendLog("${myArg1}","${myArg2}");`);

        }else{
            myWindow.run(`frontendLog("%cUnknown/no argument","color:red");`);
        }


    }
    

    myWindow.run(`console.log("Logging in frontend from backend after calling frontend function")`);


    console.log("backendFunction returning")
    return "backend direct response, has to be awaited";
});



myWindow.setSize(800,600)


let styles_reset = /*css*/`
    /* 1. Use a more-intuitive box-sizing model */
    *, *::before, *::after {
    box-sizing: border-box;
    }
    /* 2. Remove default margin */
    * {
    margin: 0;
    }
    body {
    /* 3. Add accessible line-height */
    line-height: 1.5;
    /* 4. Improve text rendering */
    -webkit-font-smoothing: antialiased;
    }
    /* 5. Improve media defaults */
    img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    }
    /* 6. Inherit fonts for form controls */
    input, button, textarea, select {
    font: inherit;
    }
    /* 7. Avoid text overflows */
    p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    }
    /* 8. Improve line wrapping */
    p {
    text-wrap: pretty;
    }
    h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
    }
    /*
    9. Create a root stacking context
    */
    #root, #__next {
    isolation: isolate;
    }

`

let styles = /*css*/`
    #main_grid {
        position:fixed;
        height: 100vh;
        width:100vw;
        display:grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns:  auto 1fr; 
        grid-template-areas:
            'header header'
            'left right'
            'footer footer '
        ;
        
    }
    #header {
        grid-area: header;
        display: flex;
        gap: 10px;
        border-bottom: solid 1px lightgray;
        padding: 10px;
        justify-content: center;
        /* justify-content: space-evenly; */

    }

    #left {
        grid-area: left;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-right: solid 1px lightgray;
        gap: 10px;

    }

    #right {
        grid-area: right;
        overflow-y:scroll;
        padding: 10px;
    }

    #footer{
        grid-area: footer;
        border-top: solid 1px lightgray;
        padding: 5px;



        display: flex;
        
        
        justify-content: space-between;
        place-items: center;
    }

`


const kv = await Deno.openKv(); // needs --unstable-kv
console.log(kv)


// await kv.set(["prefs", "opt1"], "test")
// await kv.set(["prefs", "opt2"], "test2")

// let opt2 = await kv.get(["prefs", "opt2"])
// console.log("opt2")
// console.log(opt2)

// await backend_set_kv("test","testestestesvfdsf11111")
// console.log(await backend_get_kv("test"))



let frontend = /*html*/`
    <html>
    <head>
        <title>Test App</title>
        <script src="webui.js"></script>
        <script>

            function frontendFunction(data){
                console.log("frontendFunction")
                let obj = undefined
                
                try {
                    obj = JSON.parse(data)
                }catch (e){

                }
                if (obj){
                    console.log("frontendFunction called with json",obj)
                    frontendLog("%cfrontendFunction called with json","color:gray")
                    for (let key in obj){
                        frontendLog("%c " + key + ": " + obj[key],"color:green")
                    }
                    
                }else{
                    console.log("frontendFunction called without json")
                    frontendLog("%cfrontendFunction called without json","color:gray")
                }

                
                //console.log(data)
            }

            function frontendLog(data,style){
                console.log("frontendLog")
                console.log(data,style)
                
                // if got string
                var element = document.createElement("div");
                element.appendChild(document.createTextNode(data.replace("%c","")));
                if (style){

                    element.style=style
                }
                document.getElementById('log').appendChild(element);



                
            }

            
                
            document.addEventListener('DOMContentLoaded', function() {
                
            });


            function callBackendFunctionWithObject(){
                backendFunction(JSON.stringify({
                    name:"nameStringFixed",
                    value:document.getElementById("txt_opt").value,
                    option1: document.getElementById("chk_opt1").checked,
                    option2: document.getElementById("chk_opt2").checked,
                }))
            }

            function save_values(preset){
                preset += "_"
                backend_set_kv("preset_" + preset + "txt", document.getElementById("txt_opt").value)
                backend_set_kv("preset_" + preset + "opt1", document.getElementById("chk_opt1").checked)
                backend_set_kv("preset_" + preset + "opt2", document.getElementById("chk_opt2").checked)
            }

            async function load_values(preset){
                preset += "_"

                //backend_get_kv("preset_" + preset + "txt").then((response) => {
                //    // Do something with response
                //    console.log(response)
                //    document.getElementById("txt_opt").value = response
                //});

                let val1 = await backend_get_kv("preset_" + preset + "txt")
                frontendLog("val1 is: " + val1)
                console.log(val1)
                document.getElementById("txt_opt").value = val1

                document.getElementById("chk_opt1").checked = await backend_get_kv("preset_" + preset + "opt1")
                document.getElementById("chk_opt2").checked = await backend_get_kv("preset_" + preset + "opt2")

                //backend_get_kv_and_update_what("preset_" + preset + "txt",'document.getElementById("txt_opt").value')
                //backend_get_kv_and_update_what("preset_" + preset + "opt1",'document.getElementById("chk_opt1").checked',true)
                //backend_get_kv_and_update_what("preset_" + preset + "opt2",'document.getElementById("chk_opt2").checked',true)
      
            }

            
            
        </script>
        <style id="reset">
            ${styles_reset}
        </style>
        <style>
            ${styles}
        </style>
    </head>
    

    <div id="main_grid">

        <div id="header">

            <input id="input" type="text" value="" placeholder="type something here" >
            <button onclick="backendFunction(document.getElementById('input').value)">backendFunction</button>

        </div>

        <div id="left">

            <label><input type="checkbox" id="chk_opt1">Option 1</label>
            <label><input type="checkbox" id="chk_opt2">Option 2</label>
            <label for="txt_opt">Value:</label>
            <input type="text" id="txt_opt">
            <button onclick="callBackendFunctionWithObject()">backendFunction with obj</button>

            <button onclick="webui.call('backendFunction','input')">backendFunction with string</button>
            <button onclick="backendFunction('')">backendFunction()</button>

            <button onclick="save_values('1')">save_current('1')</button>
            <button onclick="save_values('2')">save_current('2')</button>

            <button onclick="load_values('1')">load_preset('1')</button>
            <button onclick="load_values('2')">load_preset('2')</button>

            

        </div>
        <div id="right">
            <div id="log">

            </div>
        </div>

        <div id="footer">
            Test
            <button onclick="document.getElementById('log').innerHTML = ''">Clear log</button>
        </div>
    
    </div>

    


    
    
    
    
        

    </html>


`


myWindow.show(frontend);





await WebUI.wait();
