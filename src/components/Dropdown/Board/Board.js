import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import DropDown from "../Dropdown/DropDown";
import Editable from "../Editable/Editable";

import "./Board.css";

export default function Board(props) {
  const [showDropdown, setShowDropDown] = useState(false);
  return (
    <div className={`board ${props.colorTheme}`}>
      <div className="board_top">
        <p className="board_top_title">
          {props.board?.title} <span>{` ${props.board?.cards?.length}`}</span>{" "}
        </p>
        <div className="board_top_more" onClick={() => setShowDropDown(true)}>
          <MoreHorizontal />
          {showDropdown && (
            <DropDown onClose={() => setShowDropDown(false)}>
              <div className="board_dropdown">
                <p onClick={() => props.removeBoard(props.board?.id)}>
                  Delete board
                </p>
              </div>
            </DropDown>
          )}
        </div>
      </div>
      <div className="board_cards custom_scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          displayClass="boards_cards_add"
          text="Add Card"
          placeholder="Enter card"
          onSubmit={(value) => props.addCard(value, props.board.id)}
        />
      </div>
    </div>
  );
}
