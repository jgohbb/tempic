Video Tutorial 1: https://www.youtube.com/watch?v=C22hQKE_32c
Video Tutorial 2: https://www.youtube.com/watch?v=U2tEzqk4F9g

Web Info 1: https://www.w3schools.com/html/html5_draganddrop.asp
Web Info 2: https://alligator.io/js/drag-and-drop-vanilla-js/

Additional resources:
https://www.geeksforgeeks.org/html-drag-and-drop/

Example Code from geeksforgeeks:

<!-- <!DOCTYPE HTML> 
<html> 
    <head> 
        <script> 
            function allowDrop(ev) { 
                ev.preventDefault(); 
            } 
              
            function dragStart(ev) { 
                ev.dataTransfer.setData("text", ev.target.id); 
            } 
              
            function dragDrop(ev) { 
                ev.preventDefault(); 
                var data = ev.dataTransfer.getData("text"); 
                ev.target.appendChild(document.getElementById(data)); 
            } 
        </script> 
        <style> 
            .div1 { 
                width: 240px; 
                height: 75px; 
                padding: 10px; 
                border: 1px solid black; 
                background-color: #F5F5F5; 
            } 
            p { 
                font-size:20px; 
                font-weight:bold; 
            } 
            .gfg { 
                font-size:40px; 
                color:#009900; 
                font-weight:bold; 
            } 
        </style> 
    </head> 
    <body> 
        <div class = "gfg">GeeksforGeeks</div> 
         <p>Image Drag and Drop in boxes</p> 
        <div class="div1" ondrop="dragDrop(event)" ondragover="allowDrop(event)"> 
        <img id="drag1" 
        src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/Geek_logi_-low_res.png" draggable="true"
        ondragstart="dragStart(event)" width="220" height="70"></div> 
        <br> 
        <div class="div1" ondrop="dragDrop(event)" ondragover="allowDrop(event)"></div> 
    </body> 
</html>                                     
 -->