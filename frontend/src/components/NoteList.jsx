import Note from "./Note"

function NoteList({notes,refreshNote,skill,status}){
    return <>
        {notes.map((note)=>(
            <Note key={note.id} note={note} skill={skill} refreshNote={refreshNote} status={status}/>
        ))}
    </>
}
export default NoteList