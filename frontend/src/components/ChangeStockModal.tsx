import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedStock } from '../app/selectedStockSlice';
import './ChangeStockModal.css'; 

const ChangeStockModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stockInput, setStockInput] = useState('');
  const dispatch = useDispatch();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    dispatch(setSelectedStock(stockInput));
    handleClose();
  };

  return (
    <>
      <button onClick={handleOpen}>Change Stock</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>Change Stock</h2>
            <input
              type="text"
              value={stockInput}
              onChange={(e) => setStockInput(e.target.value)}
              placeholder="Enter stock name"
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeStockModal;
