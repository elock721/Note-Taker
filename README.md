# Note-Taker

This note taking app allows users to write save, and delete notes

When a user wants to take notes, they will simply create a note title and then add whatever text they would like down below in the "body" of the note

When they are finished they will hit the "save" icon in the top right of the screen and their note will appear in the left hand column 

They can repeat this process as many times as they'd like and all of their notes will be saved on the left 

When the user is finished with a saved note on the left, they can press the trash can icon attached to the end of the note and the note will be deleted from the screen 


# Pseudo Code

This application uses a backend express and saves/retrieves note data from a JSON file

The index JS file stores all the necessary functions 

The server JS file stores all of the API and HTML routes
    
    HTML Routes
    - GET/notes returns to notes.html
    - GET * returns to index.html

    API Routes 
    - GET/api/notes 
    - POST/api/notes 
    - DELETE/api/notes/:id

-------------------------------------------

Project consists of:

2 JS files - server, index

2 HTML files - index, notes

1 - CSS style sheet

3 JSON files - db, package, package.lock 




