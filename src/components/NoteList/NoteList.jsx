import React from "react";
import NoteItem from "./NoteItem/NoteItem";
import styles from './NoteList.module.scss'

const NoteList = (props) => {
	const items = props.items

	
	
	return (
		<div className={styles.NoteList}>
			<NoteItem items={items} deleteNoteFunc={props.deleteNoteFunc} handleEditFieldChange={props.handleEditFieldChange}
			exportProps={props.exportProps}/>
		</div>
	)
}

export default NoteList