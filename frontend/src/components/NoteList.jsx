import Note from "./Note"

function NoteList({notes,refreshNote,status}){
    return <>
        {notes.map((note)=>(
            <Note key={note.id} note={note} refreshNote={refreshNote} status={status}/>
        ))}
    </>
}
export default NoteList