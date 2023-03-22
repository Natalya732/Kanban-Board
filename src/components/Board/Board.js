import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import DropDown from "../Dropdown/DropDown";
import Editable from "../Editable/Editable";

import "./Board.css";

export default function Board(props) {
  const [showDropdown, setShowDropDown] = useState(false);
  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {props.board?.title} <span>{` ${props.board?.card?.length}`}</span>
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
//here we have to give position: "relative " to the parent element of the dropdown so that it can be positioned absolute
//the parent element here is board_top_more div

//her in line 16 or 17 there is ? used in; props.boards?.card?,,     ? this is called a chaining operator, if the props won't get passed
//then we will get this error that reading properties of null or so , thsu to elimiinate such errors , we are using chaining operator here
//by chaining operator if there is any error in the board one seciton than it will exit from there  only and won't complete it
