import React, {useState, useEffect} from "react";
import styles from './App.module.scss'
import Logo from "../Logo/Logo";
import NoteList from "../NoteList/NoteList";
import SwitchButton from "../UI/SwitchButton/SwitchButton";

function App() {
  const [textAreaCounter, setTextAreaCounter] = useState(0)

  const [userFontFamily, setUserFontFamily] = useState('Open Sans, sans-serif')
	const handleFontFamilyChange = (e) => {
		setUserFontFamily(e.target.value)
	}

	const [isCursive, setIsCursive] = useState(false)
	const [userFontStyle, setUserFontStyle] = useState('normal')
	const handleFontStyleChange = () => {
		isCursive
		? setUserFontStyle('normal')
		: setUserFontStyle('italic')
		setIsCursive(!isCursive)
	}

	const [isBold, setBold] = useState(false)
	const [userFontWeight, setUserFontWeight] = useState(400)
	const handleFontWeightChange = () => {
		isBold
		? setUserFontWeight(400)
		: setUserFontWeight(700)
		setBold(!isBold)
	}

  const [userFontSize, setUserFontSize] = useState(14)
	const [item, setItem] = useState('')
	const [items, setItems] = useState(
		JSON.parse(localStorage.getItem('items')) || [{
      id: Date.now(),
      item: 'Съешь ещё этих мягких французских булок, да выпей же чаю.'
    }]
	)
	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items))
	}, [items])
	const handleTextAreaChange = (e) => {
		setTextAreaCounter(e.target.value.length)
		setItem(e.target.value)
	}
	const addNewNoteItem = () => {
		if (item.trim() !== '') {
			const newNoteItem = {
				id: Date.now(),
				item,
				style: {
					fontFamily: userFontFamily,
					fontStyle: userFontStyle,
					fontWeight: userFontWeight,
          fontSize: userFontSize + 'px'
				}
			}
			setItems([...items, newNoteItem])
			setItem('')
		} else {
			setItem('')
		}
	}

  const deleteNoteItem = (id) => {
		setItems(items.filter((item) => item.id !== id ))
	}

  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemText, setEditingItemText] = useState('');
  function handleEditItem(item) {
    setEditingItemId(item.id);
    setEditingItemText(item.item);
  }
  function handleSaveItem() {
    const updatedItems = items.map(item => {
      if (item.id === editingItemId) {
        return { ...item, item: editingItemText };
      }
      return item;
    });
    setItems(updatedItems);
    setEditingItemId(null);
    setEditingItemText('');
  }
  function handleCancelEdit() {
    setEditingItemId(null);
    setEditingItemText('');
  }

  function handleInputChange(e) {
    setEditingItemText(e.target.value);
  }

  const exoprtingToNoteItemProps = {
    editingItemId: editingItemId,
    editingItemText: editingItemText,
    handleSaveItem: handleSaveItem,
    handleCancelEdit: handleCancelEdit,
    handleInputChange: handleInputChange,
    handleEditItem: handleEditItem
  }

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <Logo/>
        <div className={styles.NoteForm} >
			<form action="">
				  <textarea onChange={handleTextAreaChange}
				  name="textArea" id="textArea" cols="0" rows="3" value={item}
				  maxLength={256} placeholder="Начните вводить записку" 
				  style={{
					  fontFamily: userFontFamily,
					  fontStyle: userFontStyle,
					  fontWeight: userFontWeight,
            fontSize: userFontSize + 'px'
				  }}
				  ></textarea>
			  </form>
			  <span>{textAreaCounter + '/256'}</span>
			  <div className={styles.NoteForm__menu}>
				  <select id="fontFamilyStyler" onChange={handleFontFamilyChange}>
					  <option value="Open Sans, sans-serif">Open Sans</option>
					  <option value="Montserrat, sans-serif">Montserrat</option>
				  </select>
				  <SwitchButton text='Курсив' id='makeCursiveButton' handleClick={handleFontStyleChange}/>
				  <SwitchButton text='Жирный' id='makeBoldButton' handleClick={handleFontWeightChange}/>
          <span className={styles.NoteForm__menu__span}>Размер шрифта</span>
          <div className={styles.NoteForm__menu__font_size_styler}>
            <button onClick={() => {setUserFontSize(userFontSize - 1)}}>-</button>
            <span>{userFontSize}</span>
            <button onClick={() => {setUserFontSize(userFontSize + 1)}}>+</button>
          </div>
				  <button id='saveNoteButton' className={styles.NoteForm__menu__save_note_button} onClick={addNewNoteItem}>Сохранить</button>
			  </div>
		    </div>
      </div>
      <NoteList items={items} deleteNoteFunc={deleteNoteItem} exportProps={exoprtingToNoteItemProps}/>
    </div>
  );
}

export default App;