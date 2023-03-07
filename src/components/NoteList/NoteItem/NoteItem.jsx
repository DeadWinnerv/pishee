import React from "react";
import styles from './NoteItem.module.scss'

const NoteItem = (props) => {
	const items = props.items
	const exportProps = props.exportProps
	return (
		items.map((item, index) => {
			return(
			<div className={styles.NoteItem} style={item.style}>
				<ul>
					<li key={item.id}>
            {exportProps.editingItemId === item.id ? (
              <div>
                <input type="text" value={exportProps.editingItemText} onChange={exportProps.handleInputChange} />
								<div className={styles.NoteItem__config}>
									<button onClick={exportProps.handleSaveItem}>Сохр.</button>
                	<button onClick={exportProps.handleCancelEdit}>Отмена</button>
								</div>
              </div>
            ) : (
              <div>
                <p>{item.item}</p>
								<div className={styles.NoteItem__config}>
									<button onClick={() => exportProps.handleEditItem(item)}>Ред.</button>
								<button className="delete_note_item" onClick={() => {props.deleteNoteFunc(item.id)}}>Уд.</button>
								</div>
              </div>
            )}
          </li>
				</ul>
			</div>
			)})
		)
	
}	

export default NoteItem