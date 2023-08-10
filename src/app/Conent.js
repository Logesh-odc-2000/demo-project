"use client"
import React, { Fragment, useState, useRef } from 'react'
import DraggableList from "react-draggable-list";
import { GrCheckboxSelected } from "react-icons/gr";
import Logo from './logo'
import { PiTextAUnderline } from "react-icons/pi";
import { VscColorMode } from "react-icons/vsc";
import { PiTextAlignCenterThin, PiTextAlignJustifyThin, PiTextAlignLeftThin, PiTextAlignRightThin } from "react-icons/pi";
import { BiSolidColor } from "react-icons/bi";
import { BsTypeBold } from "react-icons/bs";
import { SketchPicker } from 'react-color';
import { Dialog, Transition } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid';
import TextEditor from './TextEditor';
import IconButtons from './IconButtons';






export default function Conent() {


  const [currentcolor, serCurrentcolor] = useState('#fff');
  const [text, setText] = useState('');
  const [enteredValues, setEnteredValues] = useState([{
    id: uuidv4(), value: '',table:[],
    bold: false, underline: false, alignleft: false, aligncenter: false, alignjustify: false, alignright: false,
  }])
  const [activeIcon, setActiveIcon] = useState(null)
  const [activeButton, setActiveButton] = useState(null);
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  const [tableGenerated, setTableGenerated] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [tableData, setTableData] = useState(inputValues);
  // const [value,setValue]=useState();
    let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleOnChange = (e) => {
    serCurrentcolor(e)
    console.log('text-color', currentcolor)
    closeModal()
  }

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleclickIcon = (id) => {
    setActiveIcon((prevActiveIcon) => (prevActiveIcon === id ? null : id))  
    console.log(activeIcon);

  }
  

  const handleSubmit = () => {
    if (text.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        value: text,
        bold: false,
        underline: false,
        alignleft: false,
        aligncenter: false,
        alignjustify: false,
        alignright: false,
      };
      setEnteredValues([...enteredValues, newItem]);
      setText('');
    }
  };
  
  

  const boldButton = () => {
    if (activeIcon !== null) {
      setEnteredValues((prev) =>
        prev.map((item) =>
          item.id === activeIcon ? { ...item, bold: !item.bold } : item
        )
      );
    }
  };

  const underlineButton = () => {
    if (activeIcon !== null) {
      setEnteredValues((prev) =>
        prev.map((item) =>
          item.id === activeIcon ? { ...item, underline: !item.underline } : item
        )
      );
    }
  };


  const aligncenter = () => {
    if (activeIcon !== null) {
      setEnteredValues((prev) =>
        prev.map((item) =>
          item.id === activeIcon ? { ...item, aligncenter: !item.aligncenter } : item
        )
      );
    }
  };

  const alignjustify = () => {
    if (activeIcon !== null) {
      setEnteredValues((prev) =>
        prev.map((item) =>
          item.id === activeIcon ? { ...item, alignjustify: !item.alignjustify } : item
        )
      );
    }
  };


  const alignleft = () => {
    if (activeIcon !== null) {
      setEnteredValues((prev) =>
        prev.map((item) =>
          item.id === activeIcon ? { ...item, alignleft: !item.alignleft } : item
        )
      );
    }
  };

  const alignright = () => {
    if (activeIcon !== null) {
      setEnteredValues((prev) =>
        prev.map((item) =>
          item.id === activeIcon ? { ...item, alignright: !item.alignright } : item
        )
      );
    }
  };
  

  const itemRenderer = ({ item, dragHandleProps }) => {
    const { onMouseDown, onTouchStart } = dragHandleProps;
    console.log(item.id);
    console.log(item);
    return (
      <div
        key={item.id}
        onClick={() => handleclickIcon(item.id)}
        className={`text-3xl  disable-select dragHandle
       ${item.bold ? 'font-bold' : ''}
       ${item.underline ? 'underline' : ''}
       ${item.aligncenter ? 'text-center' : ''}
       ${item.alignjustify ? 'text-justify' : ''}
       ${item.alignleft ? 'text-left' : ''}
       ${item.alignright ? 'text-right' : ''}  `}
        style={{ color: currentcolor.hex }}
      >
        <div onTouchStart={(e) => {
          e.preventDefault();
          console.log("touchStart");
          e.target.style.backgroundColor = "blue";
          document.body.style.overflow = "hidden";
          onTouchStart(e);
        }}
          onMouseDown={(e) => {
            console.log("mouseDown");
            document.body.style.overflow = "hidden";
            onMouseDown(e);
          }}
          onTouchEnd={(e) => {
            e.target.style.backgroundColor = "red";
            document.body.style.overflow = "visible";
          }}
          onMouseUp={() => {
            document.body.style.overflow = "visible";
          }}>
          {item.value}<span>
         {item. tableGenerated && (
              <table className='border border-collapse border-red-500'>
                <thead>

                  <tr >
                    {Array.from({ length: columns }, (_, colIndex) => (
                      <th className='border border-red-500 px-6 py-2' key={colIndex} >{inputValues[colIndex]?.[0] || ''}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: rows }, (_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: columns }, (_, colIndex) => (
                        <td className='border border-red-500 px-6 py-2' key={colIndex}>row</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
  

                 
          </span>
        </div>
      </div>
    );
  };



 
  

  const containerRef = useRef();

  const _onListChange = (newList) => {
    setEnteredValues(newList); // Update enteredValues with the new list after dragging
  };
  const buttonConfigs = [
    { onClick: boldButton, icon: <BsTypeBold /> },
    { onClick: underlineButton, icon: <PiTextAUnderline /> },
    { onClick: openModal, icon: <VscColorMode /> },
    { onClick: aligncenter, icon: <PiTextAlignCenterThin /> },
    { onClick: alignjustify, icon: <PiTextAlignJustifyThin /> },
    { onClick: alignleft, icon: <PiTextAlignLeftThin /> },
    { onClick: alignright, icon: <PiTextAlignRightThin /> },

  ];

  const handleRowsChange = event => {
    setRows(parseInt(event.target.value));
  };

  const handleColumnsChange = event => {
    setColumns(parseInt(event.target.value));
  };

  const handleSave = event => {
    event.preventDefault();
    setIsSubmitted(true);
    console.log(rows);
    console.log(columns);
  };

  const handleinputChange = (colIndex, rowIndex, e) => {
    const { value } = e.target;
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      if (!newValues[colIndex]) {
        newValues[colIndex] = [];
      }
      newValues[colIndex][rowIndex] = value;
      return newValues;
    });
  }
  const handleRowsSave = () => {
    console.log(inputValues)
    if (rows > 0 && columns > 0) {
      const newTable =[...inputValues]

      const newItem = {
        id: uuidv4(),
        value: text,
        tableGenerated: tableGenerated,
        table: newTable, // Include the newly generated table data
        bold: false,
        underline: false,
        alignleft: false,
        aligncenter: false,
        alignjustify: false,
        alignright: false,
      };

      setEnteredValues([...enteredValues, newItem]);
      setText('');
      setTableGenerated(true); // Reset tableGenerated status
      // setTableData([]); // Reset table data
      // setInputValues([]); // Reset input values
    }
  };
  

  const renderInputFields = () => {
    return Array.from({ length: columns }, (_, colIndex) => (
      <ul className='py-2'>
        <li>
          <input
            key={colIndex}
            type="text"
            value={inputValues[colIndex]?.[0] || ''}
            onChange={(e) => handleinputChange(colIndex, 0, e)} // Pass column index as the first parameter
            placeholder={`Input ${colIndex + 1}`}
            className='rounded-lg py-3 px-5'
          />
        </li>
      </ul>
    ));
  };


  return (
    <>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-2 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-10px max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                    <div>
                      <SketchPicker
                        color={currentcolor} // You can provide an initial color here
                        onChangeComplete={(color) => {
                          handleOnChange(color);
                        }}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div className='flex flex-rows space-x-10'>
        <div className='bg-gray-200  p-10   w-1/4  shadow-lg  rounded-lg'>
          <div className='rounded-lg bg-white shadow-xl h-8 w-52'>
            <div className='flex justify-center items-center py-2'>
              <Logo
                activeButton={activeButton}
                handleButtonClick={handleButtonClick}
              />
            </div>
          </div>
        </div>
        <IconButtons
          activeIcon={activeIcon}
          buttonConfigs={buttonConfigs}
          handleButtonClick={handleButtonClick}
        />
      </div>
      <div className='py-6  flex flex-rows space-x-10 '>
        <div className='rounded-lg bg-gray-200 w-3/5 h-screen shadow-lg ' >
          <DraggableList
            itemKey="id" // Make sure each item has a unique id
            template={itemRenderer}
            list={enteredValues}
            onMoveEnd={(newList) => _onListChange(newList)}
            container={() => containerRef.current}// Update the list order after drag
          />
          <div className='flex justify-center items-center'>
           
          </div>
        </div>
        <TextEditor
          activeButton={activeButton}
          text={text}
          rows={rows}
          columns={columns}
          isSubmitted={isSubmitted}
          renderInputFields={renderInputFields}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          handleRowsSave={handleRowsSave}
          handleRowsChange={handleRowsChange}
          handleColumnsChange={handleColumnsChange}
        />
      </div>
    </>
  )
}
